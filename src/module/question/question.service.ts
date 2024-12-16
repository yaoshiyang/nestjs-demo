import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, DataSource } from 'typeorm';
import { QuestionDto } from 'src/dto/question.dto';
import { ExamEntity } from 'src/entities/exam.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
import { debug } from 'console';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,

    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,

    @InjectRepository(ExamRecordEntity)
    private readonly examRecordRepository: Repository<ExamRecordEntity>,
  ) {}

  // 直接引用SQL语句查询，性能更高
  // getRawMany 与 getManyAndCount 是有区别的！尤其在GroupBy的情况下
  async findAll(query: QuestionDto): Promise<[QuestionEntity[], number]> {
    // fixedMe: 1. userId should be passed from the request context
    const userId = 1;
    const exams = await this.examRepository.find({
      where: { userId },
      select: ['id'],
    });
    const examIds = exams.map((exam) => exam.id);
    const sql = `SELECT 
    sub.question_id,
    sub.mergeCount,
    sub.mergedIds,
    COUNT(*) OVER() AS full_count
    FROM (
          SELECT 
              question_id, 
              COUNT(id) AS mergeCount,
              GROUP_CONCAT(id ORDER BY id SEPARATOR ',') AS mergedIds
              FROM \`exam-record\`
              WHERE exam_id IN (${examIds.join(',')})
              GROUP BY question_id
          ) AS sub
    ORDER BY sub.question_id -- 根据需要添加排序条件
    LIMIT ${query.pageSize} OFFSET ${(query.currentPage - 1) * query.pageSize};`;
    const results = await this.examRecordRepository.query(sql);
    if (!results || results.length === 0) return [[], 0];
    let questionIds = [],
      record: any = {},
      mergeIds: any = {},
      total = 0;
    results.forEach((v) => {
      questionIds.push(v.question_id);
      record[v.question_id] = v.mergeCount;
      total = v.full_count;
      mergeIds[v.question_id] = v.mergedIds;
    });
    let data = await this.questionRepository.findBy({ id: In(questionIds) });
    data = data.map((item) =>
      Object.assign(item, {
        count: record[item.id],
        recordIds: mergeIds[item.id],
      }),
    );
    return [data, total];
  }

  // 获取问题详情
  async getDetail(id: number, recordIds?: string) {
    let records = null;
    if (recordIds) {
      records = await this.examRecordRepository.findBy({
        id: In(recordIds.split(',')),
      });
    }
    const question = await this.questionRepository.findOne({ where: { id } });
    return Object.assign(question, { records });
  }

  async getQuestion(id: number) {
    // 获取题目
    return await this.questionRepository.findOne({ where: { id } });
  }

  async getQuestions(ids: number[]) {
    // 获取题目
    return this.questionRepository.findBy({ id: In(ids) });
  }
}

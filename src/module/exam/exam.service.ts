import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,

    @InjectRepository(ExamRecordEntity)
    private readonly examRecordRepository: Repository<ExamRecordEntity>,
  ) {}
  /**
   * 获取考试题目
   * @todo  根据算法返回题目Id；/ 先创建考试表？还是直接返回题目？取决与算法需要的条件
   *
   * @param rangeTime 面试时长
   * @param count 题目数量
   * @param ai 是否使用AI
   */
  async getQuestionIds(rangeTime: number, count: number, ai: number) {
    return [1, 2, 3];
  }

  async createExam(category: string, grade: string, location: string) {
    const userId = 1;
    const exam = this.examRepository.create({
      userId,
      category,
      grade,
      location,
      status: 0,
    });
    return await this.examRepository.save(exam);
  }
  /**
   * 创建保存考试表
   * @param ids
   */
  async updateExam(payLoad: ExamEntity) {
    const { id } = payLoad;
    await this.examRepository.update(id, payLoad);
    return this.examRepository.findOneBy({ id });
  }

  async createExamRecord(examId: number, questionId: number) {
    const examRecord = this.examRecordRepository.create({
      examId,
      questionId,
    });
    return await this.examRecordRepository.save(examRecord);
  }

  async saveExamRecord(payLoad: ExamRecordEntity) {
    const { id } = payLoad;
    await this.examRecordRepository.update(id, payLoad);
    return this.examRecordRepository.findOneBy({ id });
  }

  async saveAudio(userAudio: string) {
    return '';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamResultEntity } from '../../entities/exam-result.entity';
import { ExamResultdDto } from '../../dto/exam-result.dto';

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,

    @InjectRepository(ExamResultEntity)
    private readonly examResultRepository: Repository<ExamResultEntity>,
  ) {}

  async findAll(
    query: ExamResultdDto,
    userId: string,
  ): Promise<[ExamEntity[], number]> {
    const currentPage = (query.currentPage - 1) * query.pageSize;
    const queryBuilder = this.examRepository.createQueryBuilder('exam');
    queryBuilder
      .leftJoinAndSelect('exam.examReuslt', 'examReuslt')
      .where('exam.userId = :userId', { userId })
      .andWhere('exam.status = 1');
    if (query.startDate) {
      queryBuilder.andWhere('exam.startDate >= :startDate', {
        startDate: query.startDate,
      });
    }
    if (query.endDate) {
      queryBuilder.andWhere('exam.endDate <= :endDate', {
        endDate: query.endDate,
      });
    }
    const data = await queryBuilder
      .skip(currentPage)
      .take(query.pageSize)
      .getManyAndCount();
    return [data[0], data[1]];
  }

  async getTotal(userId: string) {
    const total = await this.examRepository.find({
      where: { userId, status: 1 },
      relations: ['examReuslt'],
    });
    let result = { count: 0, averageScore: 0, totalTime: 0, maxScore: 0 };
    for (const item of total) {
      result.count++;
      result.averageScore += item.examReuslt?.score ?? 0;
      result.totalTime += item.duration;
      result.maxScore = Math.max(result.maxScore, item.examReuslt?.score ?? 0);
    }
    result.totalTime = Math.floor(result.totalTime / 60);
    result.averageScore = result.averageScore / result.count;
    return result;
  }

  async getDetail(examId: number) {
    return await this.examResultRepository.findOne({ where: { examId } });
  }

  /**
   * 获取考试结果 + 回答的问题；用于考试结果详情页
   * @param examId
   */
  async getFullDetail(examId: number) {
    const exam = await this.examRepository.findOne({
      where: { id: examId, status: 1 },
      relations: ['examRecords', 'examReuslt', 'examRecords.question'],
    });
    return exam;
  }
}

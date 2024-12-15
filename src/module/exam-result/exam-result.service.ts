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

  async findAll(query: ExamResultdDto): Promise<[ExamEntity[], number]> {
    // fixedMe: 1. userId should be passed from the request context
    const userId = 1;
    const currentPage = (query.currentPage - 1) * query.pageSize;
    const queryBuilder = this.examRepository.createQueryBuilder('exam');
    const data = await queryBuilder
      .where('exam.userId = :userId', { userId })
      .skip(currentPage)
      .take(query.pageSize)
      .getManyAndCount();
    return [data[0], data[1]];
  }

  async getTotal() {
    // fixedMe: 1. userId should be passed from the request context
    const userId = 1;
    const total = await this.examRepository.count({
      where: { userId, status: 1 },
    });
    return total;
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
      relations: ['examRecords', 'examReuslt'],
    });
    return exam;
  }
}

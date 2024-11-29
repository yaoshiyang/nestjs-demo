import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamResult } from './record.entity';
import { RecordDto } from '../../dto/record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(ExamResult)
    private readonly recordRepository: Repository<ExamResult>,
  ) {}
  async findAll(query: RecordDto): Promise<[ExamResult[], number]> {
    const currentPage = (query.currentPage - 1) * query.pageSize;
    const queryBuilder = this.recordRepository.createQueryBuilder('record');
  }
}

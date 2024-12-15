import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';
import { ExamResultEntity } from '../../entities/exam-result.entity';
import { ExamEntity } from '../../entities/exam.entity';
import { ExamRecordEntity } from '../../entities/exam-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamResultEntity, ExamEntity, ExamRecordEntity]),
  ],
  controllers: [ExamResultController],
  providers: [ExamResultService],
})
export class ExamResultModule {}

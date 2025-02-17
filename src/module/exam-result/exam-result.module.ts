import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';
import { ExamResultEntity } from '../../entities/exam-result.entity';
import { ExamEntity } from '../../entities/exam.entity';
import { ExamRecordEntity } from '../../entities/exam-record.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ExamResultEntity, ExamEntity, ExamRecordEntity]),
  ],
  controllers: [ExamResultController],
  providers: [ExamResultService],
  exports: [ExamResultService],
})
export class ExamResultModule {}

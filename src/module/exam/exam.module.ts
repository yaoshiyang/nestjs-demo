import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
import { QuestionModule } from '../question/question.module';
import { ExamResultModule } from '../exam-result/exam-result.module';
import { HttpModule } from '@nestjs/axios';
import { ExamResultEntity } from '../../entities/exam-result.entity';

@Module({
  imports: [
    HttpModule,
    ExamResultModule,
    QuestionModule,
    TypeOrmModule.forFeature([ExamRecordEntity, ExamEntity, ExamResultEntity]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}

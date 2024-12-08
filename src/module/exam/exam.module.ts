import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    QuestionModule,
    TypeOrmModule.forFeature([ExamRecordEntity, ExamEntity]),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}

import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';
import { KnowledgeCategoryEntity } from 'src/entities/knowledge-category';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      ExamEntity,
      ExamRecordEntity,
      KnowledgeEntity,
      KnowledgeCategoryEntity,
    ]),
  ],
})
export class QuestionModule {}

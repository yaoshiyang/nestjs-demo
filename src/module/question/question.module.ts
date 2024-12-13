import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';
import { KnowledgeCategoryEntity } from 'src/entities/knowledge-category';
@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      KnowledgeEntity,
      KnowledgeCategoryEntity,
    ]),
  ],
})
export class QuestionModule {}

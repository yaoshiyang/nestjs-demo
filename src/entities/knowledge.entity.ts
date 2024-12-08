import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { KnowledgeCategoryEntity } from 'src/entities/knowledge-category';
import { QuestionEntity } from './question.entity';

// 题目与知识点关联
@Entity('knowledge')
export class KnowledgeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'question_id' })
  questionId: number;

  @Column({ type: 'int', name: 'knowlege_id' })
  knowlegeId: number;

  @OneToOne(() => KnowledgeCategoryEntity)
  @JoinColumn({ name: 'knowlege_id' })
  knowledgeCategory: KnowledgeCategoryEntity;

  @OneToOne(() => QuestionEntity)
  @JoinColumn({ name: 'question_id' })
  question: QuestionEntity;
}

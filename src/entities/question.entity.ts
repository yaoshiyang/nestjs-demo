import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';

// 考试题目表
@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  category: number;

  @Column({ length: 255, type: 'varchar' })
  title: number;

  @Column({ length: 255, type: 'text' })
  answer: string;

  @Column({ length: 255, name: 'answer_frame', type: 'varchar' })
  answerFrame: string;

  @Column('datetime')
  startDate: string;

  @Column({ length: 255, type: 'varchar' })
  extend: string;

  @OneToOne(() => KnowledgeEntity, (knowledge) => knowledge.question)
  knowledge: KnowledgeEntity;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';

// 考试题目表
@Entity('question')
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '题目大类(0 - 教师考试，1 - 公务员考试)',
  })
  category: number;

  @Column({ type: 'text' })
  title: number;

  @Column({ type: 'text' })
  answer: string;

  @Column({ length: 500, name: 'answer_frame', type: 'varchar' })
  answerFrame: string;

  @CreateDateColumn({
    type: 'timestamp', // 对应数据库的 DATETIME 类型
    comment: '创建时间',
  })
  startDate: string;

  @Column({ type: 'text' })
  extend: string;

  @OneToOne(() => KnowledgeEntity, (knowledge) => knowledge.question)
  knowledge: KnowledgeEntity;
}

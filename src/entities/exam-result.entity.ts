import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ExamEntity } from './exam.entity';
@Entity('exam-result')
export class ExamResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'exam_id' })
  examId: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试总分数',
  })
  score: number;

  @Column({ type: 'text' })
  ability: string;

  @Column({ type: 'text' })
  advantages: string;

  @Column({ type: 'text' })
  disadvantages: string;

  @Column({ type: 'text' })
  knowledge: string;

  @OneToOne((type) => ExamEntity)
  @JoinColumn({ name: 'exam_id' }) // 这是外键，如果不传name自动创建exam_id
  exam: ExamEntity;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ExamEntity } from './exam.entity';
@Entity('exam_result')
export class ExamResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'exam_id' })
  examId: number;

  @Column('int')
  score: number;

  @Column({ length: 255 })
  ability: string;

  @Column({ length: 255 })
  advantages: string;

  @Column({ length: 255 })
  disadvantages: string;

  @Column({ length: 255 })
  knowledge: string;

  @OneToOne((type) => ExamEntity)
  @JoinColumn({ name: 'exam_id' }) // 这是外键，如果不传name自动创建exam_id
  exam: ExamEntity;
}

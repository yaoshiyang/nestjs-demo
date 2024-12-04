import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ExamResultEntity } from './exam-result.entity';
import { ExamRecord } from './exam-record.entity';
// 考试表
@Entity('exam')
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column('int')
  question_id: number;

  @Column('datetime')
  startDate: string;

  @Column('datetime')
  endDate: string;

  @Column('int')
  status: string;

  @Column({ length: 255 })
  category: string;

  @Column('int')
  grade: string;

  @Column({ length: 255 })
  location: string;

  @OneToOne(() => ExamResultEntity, (examResult) => examResult.exam)
  examReuslt: ExamResultEntity;

  @OneToMany(() => ExamRecord, (examRecord) => examRecord.exam)
  examRecord: ExamRecord[];
}

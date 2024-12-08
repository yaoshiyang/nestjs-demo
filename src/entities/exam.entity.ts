import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ExamResultEntity } from './exam-result.entity';
import { ExamRecordEntity } from './exam-record.entity';
// 考试表
@Entity('exam')
export class ExamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @CreateDateColumn({
    type: 'timestamp', // 对应数据库的 DATETIME 类型
    comment: '创建时间',
  })
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @Column('int')
  status: string;

  @Column({ length: 255 })
  category: string;

  @Column('int')
  grade: string;

  @Column({ length: 255 })
  location: string;

  @OneToOne(() => ExamResultEntity, (examResult) => examResult.exam)
  examReuslt?: ExamResultEntity;

  @OneToMany(() => ExamRecordEntity, (examRecord) => examRecord.exam)
  examRecords?: ExamRecordEntity[];
}

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

  @Column({
    type: 'timestamp',
    comment: '结束时间',
  })
  endDate: Date;

  @Column({ type: 'tinyint', default: 0, comment: '0 - 进行中，1 - 完成' })
  status: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试类别（0-教师结构化面试）',
  })
  category: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试年级（0 - 小学 1- 初中 2 - 高中）',
  })
  grade: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @OneToOne(() => ExamResultEntity, (examResult) => examResult.exam)
  examReuslt?: ExamResultEntity;

  @OneToMany(() => ExamRecordEntity, (examRecord) => examRecord.exam)
  examRecords?: ExamRecordEntity[];
}

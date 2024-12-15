import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ExamEntity } from 'src/entities/exam.entity';
// 考试表
@Entity('exam-record')
export class ExamRecordEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'exam_id', type: 'int' })
  examId: number;

  @Column({ name: 'question_id', type: 'int' })
  questionId: number;

  @Column({ name: 'user_answer', type: 'text' })
  userAnswer?: string;

  @Column({ length: 255, name: 'user_audio_url', type: 'varchar' })
  userAudioUrl?: string;

  @CreateDateColumn({
    type: 'timestamp', // 对应数据库的 DATETIME 类型
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
  })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate?: Date;

  @Column({ type: 'text' })
  ai?: string;

  @ManyToOne(() => ExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam?: ExamEntity;
}

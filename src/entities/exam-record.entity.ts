import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ExamEntity } from 'src/entities/exam.entity';
// 考试表
@Entity('exam_record')
export class ExamRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'exam_id', type: 'int' })
  examId: number;

  @Column({ name: 'question_id', type: 'int' })
  questionId: number;

  @Column({ length: 255, name: 'user_answer', type: 'text' })
  userAnswer: string;

  @Column({ length: 255, name: 'user_audio_url', type: 'varchar' })
  userAudioUrl: string;

  @Column('datetime')
  startDate: Date;

  @Column('datetime')
  endDate: Date;

  @Column({ length: 255, type: 'varchar' })
  ai?: string;

  @ManyToOne(() => ExamEntity)
  @JoinColumn({ name: 'exam_id' })
  exam?: ExamEntity;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exam_result')
export class ExamResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  exam_id: number;

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
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('base-info')
export class BaseInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @Column({ length: 50 })
  location: string;

  @Column('tinyint')
  grade: number;

  @Column('tinyint')
  subject: number;

  @Column('tinyint')
  isExperience: number;
}

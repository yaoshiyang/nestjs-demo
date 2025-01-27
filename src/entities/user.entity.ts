import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

// 考试题目表
@Entity('user')
@Unique(['userId'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: 'user_id', type: 'varchar' })
  userId: string;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试类别(0 - 教师考试，1 - 公务员考试)',
  })
  category: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试类别(0 - 小学  1 - 初中 2 - 高中)',
  })
  grade: number;

  @Column({ length: 255, name: 'location', type: 'varchar' })
  location: string;

  @Column({ name: 'vip', type: 'int' })
  vip: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment: '考试类别(0 - 非会员 1 - 会员)',
  })
  level: number;

  @Column({
    type: 'tinyint',
    default: 0,
    comment:
      '学科(0 - 数学 1 - 语文 2 - 英语 3 - 科学 4 - 社会 5 - 化学 6 - 物理)',
  })
  subject: number;
}

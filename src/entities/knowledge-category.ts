import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';

// 知识条目
@Entity('knowledge-category')
export class KnowledgeCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint', default: 0 })
  category: number;

  @Column({ type: 'char' })
  title: number;

  @Column({ type: 'text' })
  describe: string;

  @CreateDateColumn({
    type: 'timestamp', // 对应数据库的 DATETIME 类型
    comment: '创建时间',
  })
  startDate: string;

  @UpdateDateColumn({
    type: 'timestamp', // 对应数据库的 DATETIME 类型
    comment: '更新时间',
  })
  updateDate: string;

  @ManyToOne(() => KnowledgeEntity, (knowledge) => knowledge.knowledgeCategory)
  relKnowledge: KnowledgeEntity[];
}

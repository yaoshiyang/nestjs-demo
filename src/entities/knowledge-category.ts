import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { KnowledgeEntity } from 'src/entities/knowledge.entity';

// 知识条目
@Entity('knowledge-category')
export class KnowledgeCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  category: number;

  @Column({ length: 255, type: 'varchar' })
  title: number;

  @Column({ length: 255, type: 'text' })
  describe: string;

  @Column('datetime')
  startDate: string;

  @Column('datetime')
  updateDate: string;

  @ManyToOne(() => KnowledgeEntity, (knowledge) => knowledge.knowledgeCategory)
  relKnowledge: KnowledgeEntity[];
}

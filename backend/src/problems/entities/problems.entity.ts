import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity('problems')
export class Problem {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column({ type: 'varchar', length: 255 })
  question: string;

  @Column({ type: 'longtext' })
  descriptions: string;

  @Column({ type: 'varchar', length: 255 })
  acceptance: string;

  @Column({ type: 'varchar', length: 255 })
  difficulty: string;

  @Column({ type: 'text' })
  topics: string;

  @Column({ type: 'text' })
  sheets: string;

  @Column({ type: 'json' })
  testcases: any;

  @Column({ type: 'text' })
  constraints: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'text' })
  hints: string;

  @Column({ type: 'int', default: 0 })
  is_approved: number;

  @Column({ type: 'int', default: 0 })
  is_enabled: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

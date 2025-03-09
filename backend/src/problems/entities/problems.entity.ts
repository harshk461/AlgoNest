import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'problems' })
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  acceptance: string;

  @Column()
  difficulty: string;

  @Column('simple-array')
  topics: string[];

  @Column('simple-array')
  sheets: string[];

  @Column({ type: 'longtext' })
  descriptions: string;

  @Column('json')
  testcases: {
    id: string;
    input: Record<string, any>;
    output: any;
    explanation?: any;
  }[];

  @Column('simple-array')
  constraints: string[];

  @Column()
  slug: string;

  @Column('simple-array')
  hints: string[];
}

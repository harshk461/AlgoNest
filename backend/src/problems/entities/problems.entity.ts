import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Description } from './descriptions.entity';

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

  @OneToMany(() => Description, (description) => description.problem, {
    cascade: true, // Automatically manage related descriptions
  })
  descriptions: Description[];

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

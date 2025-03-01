import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Problem } from './problems.entity';

@Entity({ name: 'descriptions' })
export class Description {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Problem, (problem) => problem.descriptions, {
    onDelete: 'CASCADE',
  })
  problem: Problem;
}

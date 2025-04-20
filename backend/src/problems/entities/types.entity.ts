import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 } from 'uuid';

@Entity('variable_types')
export class Variable_Types {
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();

  @Column('text')
  name: string;

  @Column('text')
  cpp: string;

  @Column('text')
  python: string;

  @Column('text')
  javascript: string;

  @Column('text')
  golang: string;

  @Column('text')
  java: string;
}

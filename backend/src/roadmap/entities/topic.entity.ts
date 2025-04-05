import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

class Resouces {
  @Column()
  title: string;

  @Column()
  descriptions: string;

  @Column('simple-array')
  links: string[];
}

@Entity('topics')
export class Topics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('int')
  displayOrder: number;

  @Column('json')
  resources: Resouces[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

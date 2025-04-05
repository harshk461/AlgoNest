import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity('roadmaps')
export class Roadmap {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid4();

  @Column()
  name: string;

  @Column({ type: 'mediumtext' })
  description: string;

  @Column()
  iconName: string;

  @Column()
  iconColor: string;

  @Column('simple-array', { nullable: true })
  topics: string[];

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}

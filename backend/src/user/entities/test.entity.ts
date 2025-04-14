import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'test' })
export class Test {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  password: string;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

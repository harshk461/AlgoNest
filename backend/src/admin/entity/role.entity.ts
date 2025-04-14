import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('roles')
export class Roles {
  @PrimaryColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column({ type: 'simple-array' }) // or `json` if using PostgreSQL or newer MySQL
  permissions: string[];

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6 })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', precision: 6, nullable: true })
  deletedAt?: Date | null;
}

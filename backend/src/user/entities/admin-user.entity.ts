// src/admin/entities/admin-user.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'admin_users' })
export class AdminUser {
  @PrimaryColumn({ type: 'uuid' })
  id: string = uuid();

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  name?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'tinyint', default: 0 })
  isEmailVerified?: boolean;

  @Column({ type: 'tinyint', default: 1 })
  isActive?: boolean;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn({ type: 'datetime', precision: 6 })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    precision: 6,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', precision: 6 })
  deletedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsBoolean, IsOptional, IsJSON } from 'class-validator';
import { v4 as uuid } from 'uuid';
enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsString()
  password: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  @IsOptional()
  gender?: Gender;

  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @IsJSON()
  metadata?: object;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsString()
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;

  @Column({ type: 'tinyint', default: 0 })
  @IsBoolean()
  isAdmin: boolean;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ nullable: true })
  passwordResetExpires: Date;

  @Column('enum', { enum: ['user', 'admin', 'instructor'], default: 'user' })
  role: 'user' | 'admin' | 'instructor';

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ type: 'tinyint', default: 1 })
  @IsBoolean()
  isActive: boolean;

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

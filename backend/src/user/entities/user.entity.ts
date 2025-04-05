import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
<<<<<<< HEAD
import {
  IsString,
  IsBoolean,
  IsOptional,
  IsJSON,
  IsEmail,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
=======

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
>>>>>>> 2973b12 (new adds)

  @Column({ unique: true })
  email: string;

<<<<<<< HEAD
  @Column({ type: 'varchar', length: 255 })
  @IsString()
  password: string;

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
=======
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
>>>>>>> 2973b12 (new adds)

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

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

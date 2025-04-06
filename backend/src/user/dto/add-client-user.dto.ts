import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsJSON,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsJSON()
  metadata?: object;

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;

  @IsOptional()
  @IsString()
  emailVerificationToken?: string;

  @IsOptional()
  @IsString()
  passwordResetToken?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  passwordResetExpires?: Date;

  @IsOptional()
  @IsEnum(['user', 'admin', 'instructor'])
  role?: 'user' | 'admin' | 'instructor';

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  lastLogin?: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// src/admin/dto/create-admin-user.dto.ts
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { Gender } from '../entities/admin-user.entity';

export class CreateAdminUserDto {
  @IsUUID()
  id: string;

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

  @IsBoolean()
  isEmailVerified: boolean;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  role: string;
}

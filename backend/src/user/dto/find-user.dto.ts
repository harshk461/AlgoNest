import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

export class FindParticularUserDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

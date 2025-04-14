import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  permissions: string[];
}

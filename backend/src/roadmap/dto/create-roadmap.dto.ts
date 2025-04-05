import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateRoadmapDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  iconName: string;

  @IsString()
  iconColor: string;

  @IsArray()
  @IsOptional()
  topics?: string[];
}

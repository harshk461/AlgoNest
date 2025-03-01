import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
  IsObject,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class TestCaseDto {
  @IsObject()
  input: Record<string, any>;

  @IsOptional()
  output: any;

  @IsOptional()
  explanation?: any;
}

class DescriptionDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class UpdateProblemDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  question?: string;

  @IsOptional()
  @IsString()
  acceptance?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  topics?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sheets?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescriptionDto)
  descriptions?: DescriptionDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  testcases?: TestCaseDto[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  constraints?: string[];
}

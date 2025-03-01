import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ArrayNotEmpty,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';

class TestCaseDto {
  @IsObject()
  input: Record<string, any>;

  @IsOptional()
  output?: any;

  @IsOptional()
  explanation?: string;
}

class DescriptionDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}

export class ProblemDTO {
  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  acceptance: string;

  @IsNotEmpty()
  @IsString()
  difficulty: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  topics: string[];

  @IsArray()
  @IsString({ each: true })
  sheets: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescriptionDto)
  descriptions: DescriptionDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TestCaseDto)
  testcases: TestCaseDto[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  constraints: string[];

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsArray()w
  hints: string[];
}

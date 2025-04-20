import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVariableTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cpp: string;

  @IsNotEmpty()
  @IsString()
  python: string;

  @IsNotEmpty()
  @IsString()
  javascript: string;

  @IsNotEmpty()
  @IsString()
  golang: string;

  @IsNotEmpty()
  @IsString()
  java: string;
}

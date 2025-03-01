import { IsObject, IsOptional } from 'class-validator';

export class TestCaseDTO {
  @IsOptional()
  id: string;

  @IsObject()
  input: Record<string, any>;

  @IsObject()
  output: any;

  @IsOptional()
  explanation?: any;
}

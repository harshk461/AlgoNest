import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateDescriptionDTO {
  @IsNotEmpty()
  @IsNumber()
  problemId: number;

  @IsNotEmpty()
  @IsNumber()
  description_id: number;

  @IsNotEmpty()
  @IsString()
  text: string;
}

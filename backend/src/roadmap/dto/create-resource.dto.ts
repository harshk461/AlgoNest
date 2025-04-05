import {
  IsString,
  IsArray,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateResourceDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  color: string;

  @IsArray()
  link: string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsEnum(['video', 'article', 'book', 'podcast', 'other'])
  type: 'video' | 'article' | 'book' | 'podcast' | 'other';

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

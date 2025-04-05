import { IsJSON, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

class Resouces {
  @Column()
  title: string;

  @Column()
  descriptions: string;

  @Column('simple-array')
  links: string[];
}

export class CreateTopicDTO {
  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  description: string;

  @IsNumber()
  @Column('int')
  displayOrder: number;

  @IsJSON()
  @Column('json')
  resources: Resouces[];
}

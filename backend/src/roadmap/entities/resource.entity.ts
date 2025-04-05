import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('resources')
export class Resources {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column('simple-array')
  link: string[];

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: ['video', 'article', 'book', 'podcast', 'other'],
    default: 'other',
  })
  type: string;

  @Column({ default: true })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}

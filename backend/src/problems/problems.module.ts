import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemService } from './problem.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problems.entity';
import { Description } from './entities/descriptions.entity';
import { RawQueries } from 'src/rawQueries/rawQueries';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Description])],
  controllers: [ProblemsController],
  providers: [ProblemService, RawQueries],
})
export class ProblemsModule {}

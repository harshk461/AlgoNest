import { Module } from '@nestjs/common';
import { ProblemsController } from './problems.controller';
import { ProblemService } from './problem.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from './entities/problems.entity';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { Variable_Types } from './entities/types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Problem, Variable_Types])],
  controllers: [ProblemsController],
  providers: [ProblemService, RawQueries],
})
export class ProblemsModule {}

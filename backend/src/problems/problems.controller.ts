import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProblemService } from './problem.services';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/role.decorator';
import { CreateProblemDto } from './dto/create-problem.dto';

@Controller('problems')
export class ProblemsController {
  constructor(private problemService: ProblemService) {}

  @Get('all-problems')
  getAllProblems(
    @Query('problem') problem: string,
    @Query('difficulty') difficulty: string,
    @Query('topics') topics: string,
  ) {
    return this.problemService.getAllProblems({ problem, difficulty, topics });
  }

  @Post('add-problem')
  // @UseGuards(RoleGuard)
  // @Roles('admin', 'super-admin')
  addNewProblem(@Body() problemDTO: CreateProblemDto) {
    return this.problemService.addProblem(problemDTO);
  }

  @Get('get-problem')
  getParticularProblem(@Query('slug') slug: string) {
    return this.problemService.getParicularProblem(slug);
  }

  @Get('all-deleted')
  getAllDeletedProblems() {
    return this.problemService.allDeletedProblems();
  }

  @Get('all-approved')
  getAllApprovedProblems() {
    return this.problemService.allApprovedProblems();
  }

  @Delete('delete-problem')
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  deleteProblem(@Query('problem') problem: string) {
    return this.problemService.deleteProblem(problem);
  }
}

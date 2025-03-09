import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProblemService } from './problem.services';
import { ProblemDTO } from './dto/problem.dto';
import { UpdateProblemDTO } from './dto/update-problem.dto';
import { TestCaseDTO } from './dto/testcase.dto';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/role.decorator';

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
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  addNewProblem(@Body(ValidationPipe) problemDTO: ProblemDTO) {
    return this.problemService.addNewProblem(problemDTO);
  }

  @Get('get-problem')
  getParticularProblem(@Query('slug') slug: string) {
    return this.problemService.getParicularProblem(slug);
  }

  @Patch('update-problem')
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  updateProblem(@Body() updateProblemDto: UpdateProblemDTO) {
    return this.problemService.updateProblem(updateProblemDto);
  }

  @Delete('delete-problem')
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  deleteProblem(@Query('problem') problem: number) {
    return this.problemService.deleteProblem(problem);
  }

  @Put('add-testcase')
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  addTestcase(@Query('problem') problem: number, testcaseDto: TestCaseDTO) {
    return this.problemService.addTestcase(problem, testcaseDto);
  }

  @Delete('delete-testcase')
  @UseGuards(RoleGuard)
  @Roles('admin', 'super-admin')
  deleteTestcase(
    @Query('problem') problem: number,
    @Query('testcase') testcase: string,
  ) {
    return this.problemService.deleteTestcase(problem, testcase);
  }
}

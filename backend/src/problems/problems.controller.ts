import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProblemService } from './problem.services';
import { ProblemDTO } from './dto/problem.dto';
import { UpdateProblemDTO } from './dto/update-problem.dto';
import { UpdateDescriptionDTO } from './dto/update-description.dto';
import { TestCaseDTO } from './dto/testcase.dto';

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
  addNewProblem(@Body(ValidationPipe) problemDTO: ProblemDTO) {
    return this.problemService.addNewProblem(problemDTO);
  }

  @Get('get-problem')
  getParticularProblem(@Query('slug') slug: string) {
    return this.problemService.getParicularProblem(slug);
  }

  @Put('update-problem')
  updateProblem(@Body() updateProblemDto: UpdateProblemDTO) {
    return this.problemService.updateProblem(updateProblemDto);
  }

  @Delete('delete-problem')
  deleteProblem(@Query('problem') problem: number) {
    return this.problemService.deleteProblem(problem);
  }

  @Put('update-description')
  updateDescription(@Body() updateDescriptionDto: UpdateDescriptionDTO) {
    return this.problemService.updateDescription(updateDescriptionDto);
  }

  @Delete('delete-description')
  deleteDescription(
    @Query('problem') problem: number,
    @Query('description') description: number,
  ) {
    return this.problemService.deleteDescription(problem, description);
  }

  @Put('add-testcase')
  addTestcase(@Query('problem') problem: number, testcaseDto: TestCaseDTO) {
    return this.problemService.addTestcase(problem, testcaseDto);
  }

  @Delete('delete-testcase')
  deleteTestcase(
    @Query('problem') problem: number,
    @Query('testcase') testcase: string,
  ) {
    return this.problemService.deleteTestcase(problem, testcase);
  }
}

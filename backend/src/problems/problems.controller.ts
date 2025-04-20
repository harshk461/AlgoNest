import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  // ValidationPipe,
} from '@nestjs/common';
import { ProblemService } from './problem.services';
import { RoleGuard } from 'src/roles/role.guard';
import { Roles } from 'src/roles/role.decorator';
import { CreateProblemDto } from './dto/create-problem.dto';
import { CreateVariableTypeDto } from './dto/create-variable-type.dto';

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

  @Get('all-variable-types')
  allVariablesType(@Query('filter') filter?: string) {
    return this.problemService.getAllVariableTypes(filter);
  }

  @Post('add-new-variable')
  addNewVariable(@Body() body: CreateVariableTypeDto) {
    return this.problemService.addVariableType(body);
  }

  @Post('add-bulk-variables')
  addBulkVariables() {
    const data = [
      {
        name: 'Integer',
        cpp: 'int',
        python: 'int',
        javascript: 'number',
        golang: 'int',
        java: 'Integer',
      },
      {
        name: 'Float',
        cpp: 'float',
        python: 'float',
        javascript: 'number',
        golang: 'float32',
        java: 'Float',
      },
      {
        name: 'Double',
        cpp: 'double',
        python: 'float',
        javascript: 'number',
        golang: 'float64',
        java: 'Double',
      },
      {
        name: 'Boolean',
        cpp: 'bool',
        python: 'bool',
        javascript: 'boolean',
        golang: 'bool',
        java: 'Boolean',
      },
      {
        name: 'String',
        cpp: 'std::string',
        python: 'str',
        javascript: 'string',
        golang: 'string',
        java: 'String',
      },
    ];

    data.forEach(async (item) => {
      await this.problemService.addVariableType(item);
    });

    return { status: 200 };
  }
}

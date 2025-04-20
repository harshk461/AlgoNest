import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './entities/problems.entity';
import { Utils } from 'src/utils/utils';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { CreateProblemDto } from './dto/create-problem.dto';
import { Variable_Types } from './entities/types.entity';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    @InjectRepository(Variable_Types)
    private variableTypesRepository: Repository<Variable_Types>,
    private readonly rawQueries: RawQueries,
  ) {}

  async getAllProblems(filters: {
    problem?: string;
    difficulty?: string;
    topics?: string;
  }) {
    const { problem, difficulty, topics } = filters;

    const difficultyArray = difficulty ? difficulty.split(',') : [];
    const topicsArray = topics ? topics.split(',') : [];

    return this.rawQueries.getFilteredProblems(
      problem,
      difficultyArray,
      topicsArray,
    );
  }

  async addProblem(createProblemDto: CreateProblemDto): Promise<Problem> {
    const {
      question,
      acceptance,
      difficulty,
      topics,
      sheets,
      descriptions,
      testcases,
      constraints,
      slug,
      hints,
      output_type,
    } = createProblemDto;

    const problem = this.problemRepository.create({
      question,
      acceptance,
      difficulty,
      descriptions,
      slug,
      // Convert arrays to strings
      topics: topics.join(','),
      sheets: sheets.join(','),
      constraints: constraints.join(','),
      hints: hints.join(','),
      // Convert nested object to JSON
      testcases: JSON.stringify(testcases),
      output_type: output_type,
    });

    return this.problemRepository.save(problem);
  }

  async allDeletedProblems() {
    return this.problemRepository.find({ where: { deleted_at: null } });
  }

  async allApprovedProblems() {
    return this.problemRepository.find({ where: { is_approved: 0 } });
  }

  async getParicularProblem(slug: string) {
    if (!slug) {
      return { error: 'Problem name is required' };
    }

    const problem = this.rawQueries.getProblemByName(slug);

    return problem;
  }

  async deleteProblem(problem: string) {
    const problem_data = await this.problemRepository.findOne({
      where: { id: problem },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't exists");
    }

    await this.problemRepository.delete({ id: problem });

    return Utils.createResponse('success', 'Problem deleted successfully');
  }

  async getApprovedProblems() {}

  async getAllVariableTypes(filter?: string): Promise<Variable_Types[]> {
    const query =
      this.variableTypesRepository.createQueryBuilder('variable_types');

    if (filter) {
      query
        .where('LOWER(variable_types.cpp) LIKE :filter', {
          filter: `%${filter.toLowerCase()}%`,
        })
        .orWhere('LOWER(variable_types.python) LIKE :filter', {
          filter: `%${filter.toLowerCase()}%`,
        })
        .orWhere('LOWER(variable_types.javascript) LIKE :filter', {
          filter: `%${filter.toLowerCase()}%`,
        })
        .orWhere('LOWER(variable_types.golang) LIKE :filter', {
          filter: `%${filter.toLowerCase()}%`,
        })
        .orWhere('LOWER(variable_types.java) LIKE :filter', {
          filter: `%${filter.toLowerCase()}%`,
        });
    }

    return await query.getMany();
  }

  async addVariableType(data: {
    name: string;
    cpp: string;
    python: string;
    javascript: string;
    golang: string;
    java: string;
  }): Promise<Variable_Types> {
    const newVariableType = this.variableTypesRepository.create(data);
    return await this.variableTypesRepository.save(newVariableType);
  }
}

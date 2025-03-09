import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Problem } from './entities/problems.entity';
import { ProblemDTO } from './dto/problem.dto';
import { Description } from './entities/descriptions.entity';
import { Utils } from 'src/utils/utils';
import { RawQueries } from 'src/rawQueries/rawQueries';
import { UpdateProblemDTO } from './dto/update-problem.dto';
import { UpdateDescriptionDTO } from './dto/update-description.dto';
import { TestCaseDTO } from './dto/testcase.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(Problem)
    private problemRepository: Repository<Problem>,
    @InjectRepository(Description)
    private descriptionRepository: Repository<Description>,
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

  async addNewProblem(problemDto: ProblemDTO) {
    const newProblem = this.problemRepository.create({
      ...problemDto,
      testcases: problemDto.testcases.map((tc) => ({
        id: uuidv4(),
        ...tc,
      })),
    });

    return await this.problemRepository.save(newProblem);
  }

  async getParicularProblem(slug: string) {
    if (!slug) {
      return { error: 'Problem name is required' };
    }

    const problem = this.rawQueries.getProblemByName(slug);

    return problem;
  }

  async updateProblem(updateProblemDto: UpdateProblemDTO) {
    const { id, ...problem_data } = updateProblemDto;

    const problem = await this.problemRepository.findOne({ where: { id } });

    if (!problem) {
      throw new NotFoundException("Problem Doesn't Exist");
    }

    // Merge the updated data into the existing problem
    this.problemRepository.merge(problem, problem_data);

    // Save the updated problem
    await this.problemRepository.save(problem);

    return { message: 'Problem updated successfully', problem };
  }

  async deleteProblem(problem: number) {
    const problem_data = await this.problemRepository.findOne({
      where: { id: problem },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't exists");
    }

    await this.problemRepository.delete({ id: problem });

    return Utils.createResponse('success', 'Problem deleted successfully');
  }

  async updateDescription(updateDescription: UpdateDescriptionDTO) {
    const { problemId, description_id, ...data } = updateDescription;

    // Check if the problem exists
    const problem_data = await this.problemRepository.findOne({
      where: { id: problemId },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't Exist");
    }

    // Fetch the description correctly
    const description_data = await this.descriptionRepository.findOne({
      where: { id: description_id, problem: { id: problemId } }, // Ensure the problem ID matches
      relations: ['problem'], // Include relations if needed
    });

    if (!description_data) {
      throw new UnauthorizedException(
        "Description Doesn't Exist or doesn't belong to the given problem",
      );
    }

    // Update only the provided fields
    Object.assign(description_data, data);

    // Save the updated description
    await this.descriptionRepository.save(description_data);

    return {
      message: 'Description Updated Successfully',
    };
  }

  async deleteDescription(problem: number, description: number) {
    const problem_data = await this.problemRepository.findOne({
      where: { id: problem },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't Exist");
    }

    const description_data = await this.descriptionRepository.findOne({
      where: { id: description, problem: { id: problem } }, // Ensure the problem ID matches
      relations: ['problem'], // Include relations if needed
    });

    if (!description_data) {
      throw new UnauthorizedException(
        "Description Doesn't Exist or doesn't belong to the given problem",
      );
    }

    await this.descriptionRepository.delete({
      id: description,
      problem: { id: problem },
    });

    return { message: 'Description deleted successfully' };
  }

  async addTestcase(problem: number, testcaseDto: TestCaseDTO) {
    const problem_data = await this.problemRepository.findOne({
      where: { id: problem },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't Exist");
    }

    if (!problem_data.testcases) {
      problem_data.testcases = [];
    }

    if (testcaseDto.id) {
      const existingTestCaseIndex = problem_data.testcases.findIndex(
        (tc) => tc.id === testcaseDto.id,
      );

      if (existingTestCaseIndex !== -1) {
        problem_data.testcases[existingTestCaseIndex] = {
          ...problem_data.testcases[existingTestCaseIndex],
          ...testcaseDto,
        };
      } else {
        problem_data.testcases.push(testcaseDto);
      }
    } else {
      testcaseDto.id = uuidv4();
      problem_data.testcases.push(testcaseDto);
    }

    await this.problemRepository.save(problem_data);

    return {
      message: 'Test case added/updated successfully',
      testcases: problem_data.testcases,
    };
  }

  async deleteTestcase(problem: number, testcase: string) {
    const problem_data = await this.problemRepository.findOne({
      where: { id: problem },
    });

    if (!problem_data) {
      throw new UnauthorizedException("Problem Doesn't Exist");
    }

    const isTestcasePresent = problem_data.testcases.some(
      (item) => item.id === testcase,
    );

    if (!isTestcasePresent) {
      throw new UnauthorizedException("Testcase doesn't exist");
    }

    // Corrected: Assign the filtered array back
    problem_data.testcases = problem_data.testcases.filter(
      (item) => item.id !== testcase,
    );

    await this.problemRepository.save(problem_data);

    return {
      message: 'Testcase Deleted',
    };
  }
}

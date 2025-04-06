import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RawQueries {
  constructor(private readonly dataSource: DataSource) {}

  async getProblemByName(slug: string) {
    const queryProblem = `SELECT * FROM problems WHERE slug = ?;`;

    const result = await this.dataSource.query(queryProblem, [slug]);

    if (!result.length) return null;

    const problemId = result[0].id;

    const queryDescriptions = `
  SELECT d.*
  FROM descriptions d
  WHERE d.problemId = ?;
`;

    const descriptions = await this.dataSource.query(queryDescriptions, [
      problemId,
    ]);

    return { problem: result, descriptions };
  }

  async getFilteredProblems(
    problem?: string,
    difficulty?: string[],
    topics?: string[],
  ) {
    let where = `WHERE 1=1`;

    if (problem) {
      where += ` AND question LIKE '%${problem}%'`; // Use LIKE properly
    }

    if (difficulty && difficulty.length > 0) {
      where += ` AND difficulty IN (${difficulty.map((item) => `'${item.toLowerCase()}'`).join(',')})`;
    }

    if (topics && topics.length > 0) {
      // Use FIND_IN_SET for each topic
      const topicConditions = topics
        .map((topic) => `FIND_IN_SET('${topic.toLowerCase()}', topics)`)
        .join(' OR ');

      where += ` AND (${topicConditions})`;
    }

    const sqlQuery = `
  SELECT *
  FROM problems
  ${where}`;

    return this.dataSource.query(sqlQuery);
  }

  
}

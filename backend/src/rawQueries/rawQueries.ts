import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class RawQueries {
  constructor(private readonly dataSource: DataSource) {}

  async getProblemByName(slug: string) {
    const queryProblem = `SELECT * FROM problems WHERE slug = ?;`;

    const result = await this.dataSource.query(queryProblem, [slug]);

    const problem = {
      ...result[0],
      testcases: JSON.parse(result[0].testcases),
    };
    return { problem };
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

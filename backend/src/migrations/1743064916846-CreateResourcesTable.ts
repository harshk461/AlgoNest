import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateResourcesTable1701234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'resources',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'milestone_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['video', 'article', 'exercise'],
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'display_order',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Create Foreign Key Constraint
    await queryRunner.createForeignKey(
      'resources',
      new TableForeignKey({
        columnNames: ['milestone_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'milestones',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key first
    await queryRunner.dropForeignKey('resources', 'milestone_id');

    // Then drop the table
    await queryRunner.dropTable('resources');
  }
}

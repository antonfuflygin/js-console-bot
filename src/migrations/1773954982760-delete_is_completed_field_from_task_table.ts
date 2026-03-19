import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteIsCompletedFieldFromTaskTable1773954982760 implements MigrationInterface {
    name = 'DeleteIsCompletedFieldFromTaskTable1773954982760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "isCompleted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "isCompleted" boolean NOT NULL`);
    }

}

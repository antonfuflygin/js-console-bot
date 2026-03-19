import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteHasBeenShownFieldFromTasks1773947489542 implements MigrationInterface {
    name = 'DeleteHasBeenShownFieldFromTasks1773947489542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "hasBeenShown"`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isCompleted" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "isCompleted" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "hasBeenShown" boolean NOT NULL DEFAULT false`);
    }

}

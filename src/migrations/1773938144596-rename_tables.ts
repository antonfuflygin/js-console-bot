import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTables1773938144596 implements MigrationInterface {
    name = 'RenameTables1773938144596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_da349034af45568bdc0ab493140"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "isCompleted" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "hasBeenShown" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_da349034af45568bdc0ab493140" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_da349034af45568bdc0ab493140"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "hasBeenShown"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_da349034af45568bdc0ab493140" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

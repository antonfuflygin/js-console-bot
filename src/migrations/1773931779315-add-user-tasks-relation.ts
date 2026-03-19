import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTasksRelation1773931779315 implements MigrationInterface {
    name = 'AddUserTasksRelation1773931779315'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Tasks" ("id" SERIAL NOT NULL, "task" character varying NOT NULL, "isCompleted" boolean NOT NULL, "hasBeenShown" boolean NOT NULL, CONSTRAINT "PK_f38c2a61ff630a16afca4dac442" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tasks" ("user_id" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_a22b2734df8bba2b8b7ebd3ae28" PRIMARY KEY ("user_id", "task_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da349034af45568bdc0ab49314" ON "user_tasks" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_67a8a20c2e44bfb84ca1a33e6d" ON "user_tasks" ("task_id") `);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_da349034af45568bdc0ab493140" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df" FOREIGN KEY ("task_id") REFERENCES "Tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_da349034af45568bdc0ab493140"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a8a20c2e44bfb84ca1a33e6d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da349034af45568bdc0ab49314"`);
        await queryRunner.query(`DROP TABLE "user_tasks"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Tasks"`);
    }

}

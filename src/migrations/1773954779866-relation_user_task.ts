import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserTask1773954779866 implements MigrationInterface {
    name = 'RelationUserTask1773954779866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_da349034af45568bdc0ab493140"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da349034af45568bdc0ab49314"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67a8a20c2e44bfb84ca1a33e6d"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_a22b2734df8bba2b8b7ebd3ae28"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_67a8a20c2e44bfb84ca1a33e6df" PRIMARY KEY ("task_id")`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "task_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userTasksUserId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "userTasksTaskId" integer`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userTasksUserId" integer`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "userTasksTaskId" integer`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_83e94423ca0675e4ac503d86413" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "taskId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_83e94423ca0675e4ac503d86413"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_07df033b0b61ee58ded3168bf2a" PRIMARY KEY ("userId", "taskId")`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "isCompleted" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_395f786e0c436699f547622d787" FOREIGN KEY ("userTasksUserId", "userTasksTaskId") REFERENCES "user_tasks"("userId","taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_d8afb070d2a91a1015bfd50791e" FOREIGN KEY ("userTasksUserId", "userTasksTaskId") REFERENCES "user_tasks"("userId","taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_83e94423ca0675e4ac503d86413" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_eff2f1ef189a7952bc6294a1da5" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_eff2f1ef189a7952bc6294a1da5"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "FK_83e94423ca0675e4ac503d86413"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_d8afb070d2a91a1015bfd50791e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_395f786e0c436699f547622d787"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_07df033b0b61ee58ded3168bf2a"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_83e94423ca0675e4ac503d86413" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "taskId"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_83e94423ca0675e4ac503d86413"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userTasksTaskId"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "userTasksUserId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userTasksTaskId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "userTasksUserId"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "task_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_67a8a20c2e44bfb84ca1a33e6df" PRIMARY KEY ("task_id")`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP CONSTRAINT "PK_67a8a20c2e44bfb84ca1a33e6df"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "PK_a22b2734df8bba2b8b7ebd3ae28" PRIMARY KEY ("user_id", "task_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_67a8a20c2e44bfb84ca1a33e6d" ON "user_tasks" ("task_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_da349034af45568bdc0ab49314" ON "user_tasks" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_67a8a20c2e44bfb84ca1a33e6df" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD CONSTRAINT "FK_da349034af45568bdc0ab493140" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class init1655217837232 implements MigrationInterface {
    name = 'init1655217837232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifier"."tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying(400) NOT NULL, "user_id" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "token_constraint" ON "notifier"."tokens" ("token") `);
        await queryRunner.query(`CREATE INDEX "user_id_constraint" ON "notifier"."tokens" ("user_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "notifier"."user_id_constraint"`);
        await queryRunner.query(`DROP INDEX "notifier"."token_constraint"`);
        await queryRunner.query(`DROP TABLE "notifier"."tokens"`);
    }

}

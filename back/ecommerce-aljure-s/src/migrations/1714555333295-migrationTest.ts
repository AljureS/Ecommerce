import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationTest1714555333295 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "USERS" RENAME COLUMN "name" TO "name_user"',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE "USERS" RENAME COLUMN "name_user" TO "name"',
        );
    }

}

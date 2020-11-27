import { MigrationInterface, QueryRunner } from "typeorm";

export class seed1606344300862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO user VALUES (1, 'bernas', 'pass123')`);
        await queryRunner.query(`INSERT INTO user VALUES (2, 'vitinho', 'pass123')`);
        await queryRunner.query(`INSERT INTO user VALUES (3, 'tone', 'pass123')`);
        await queryRunner.query(`INSERT INTO user VALUES (4, 'filipe', 'pass123')`);
        await queryRunner.query(`INSERT INTO user VALUES (5, 'leonor', 'pass123')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM user WHERE id = 1`);
        await queryRunner.query(`DELETE FROM user WHERE id = 2`);
        await queryRunner.query(`DELETE FROM user WHERE id = 3`);
        await queryRunner.query(`DELETE FROM user WHERE id = 4`);
        await queryRunner.query(`DELETE FROM user WHERE id = 5`);
    }

}

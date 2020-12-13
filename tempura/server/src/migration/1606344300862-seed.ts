import { MigrationInterface, QueryRunner } from "typeorm";

export class seed1606344300862 implements MigrationInterface {

    // all passwords are 'pass123'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO user(username,password) VALUES ('bernas', '$2a$08$JA.JgQ4jSyv4rZn7FpZyfeJlStxLGD7b7aGEdz/6i8OxGyOIgYwTC')`);
        await queryRunner.query(`INSERT INTO user(username,password) VALUES ('vitinho', '$2a$08$JA.JgQ4jSyv4rZn7FpZyfeJlStxLGD7b7aGEdz/6i8OxGyOIgYwTC')`);
        await queryRunner.query(`INSERT INTO user(username,password) VALUES ('tone', '$2a$08$JA.JgQ4jSyv4rZn7FpZyfeJlStxLGD7b7aGEdz/6i8OxGyOIgYwTC')`);
        await queryRunner.query(`INSERT INTO user(username,password) VALUES ('filipe', '$2a$08$JA.JgQ4jSyv4rZn7FpZyfeJlStxLGD7b7aGEdz/6i8OxGyOIgYwTC')`);
        await queryRunner.query(`INSERT INTO user(username,password) VALUES ('leonor', '$2a$08$JA.JgQ4jSyv4rZn7FpZyfeJlStxLGD7b7aGEdz/6i8OxGyOIgYwTC')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM user WHERE id = 1`);
        await queryRunner.query(`DELETE FROM user WHERE id = 2`);
        await queryRunner.query(`DELETE FROM user WHERE id = 3`);
        await queryRunner.query(`DELETE FROM user WHERE id = 4`);
        await queryRunner.query(`DELETE FROM user WHERE id = 5`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1678478369682 implements MigrationInterface {
    name = 'myInit1678478369682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionType" integer NOT NULL, "transactionDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "productDescription" character varying(30) NOT NULL, "transactionValue" double precision NOT NULL, "sellerName" character varying(20) NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}

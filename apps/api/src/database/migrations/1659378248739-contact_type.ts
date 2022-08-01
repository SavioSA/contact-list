import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class contactType1659378125005 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contact_type",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "type",
            type: "varchar"
          },
        ],
      }),
      true,
    );
    // await queryRunner.query(
    //   'INSERT INTO contact_type (type) VALUES (phone); INSERT INTO contact_type (type) VALUES (email);'
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("contact_type");
  }

}

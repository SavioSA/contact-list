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
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: "type",
            type: "varchar"
          },
        ],
      }),
      true,
    );
    await queryRunner.query(
      'INSERT INTO contact_type(type) VALUES("Telefone");'
    );
    await queryRunner.query(
      'INSERT INTO contact_type(type) VALUES("Email");'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("contact_type");
  }

}

import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class contactContactType1659378277215 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contact-contact_types",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "contact_id",
            type: "int",
          },
          {
            name: "contact_type_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true,
    );
    const contactForeignKey = new TableForeignKey({
      columnNames: ["contact_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "contact",
      onDelete: "CASCADE"
    });
    const contactTypeForeignKey = new TableForeignKey({
      columnNames: ["contact_type_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "contact_type",
      onDelete: "CASCADE"
    });
    await queryRunner.createForeignKey("contact-contact_types", contactForeignKey);
    await queryRunner.createForeignKey("contact-contact_types", contactTypeForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("contact-contact_types");
  }

}

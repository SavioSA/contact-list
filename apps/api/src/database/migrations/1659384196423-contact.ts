import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class contact1659384196423 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contact",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: "identifier",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "is_whatsapp",
            type: "boolean"
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

    const userForeignKey = new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE"
    });

    const contactTypeForeignKey = new TableForeignKey({
      columnNames: ["contact_type_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "contact_type",
      onDelete: "CASCADE"
    });

    await queryRunner.createForeignKey("contact", userForeignKey);
    await queryRunner.createForeignKey("contact", contactTypeForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('contact');
  }

}

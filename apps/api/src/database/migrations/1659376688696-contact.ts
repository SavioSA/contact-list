import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class contact1659376688696 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "contact",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "identifier",
            type: "varchar"
          },
          {
            name: "user_id",
            type: "int",
            isUnique: true
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
    const foreignKey = new TableForeignKey({
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE"
    });
    await queryRunner.createForeignKey("contact", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('contact');
  }

}

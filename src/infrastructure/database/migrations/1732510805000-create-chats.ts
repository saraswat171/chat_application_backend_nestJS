import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateChatEntityMigration1732510805000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the `chats` table
    await queryRunner.createTable(
      new Table({
        name: 'chats',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'is_group_chat',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'group_name',
            type: 'varchar',
            isNullable: true, // Assuming group name is optional
          },
          {
            name: 'owner_uuid',
            type: 'uuid',
            isNullable: true, // Nullable if the chat is not a group chat
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    // Create the foreign key relation for the `owner` (many-to-one with `users`)
    await queryRunner.createForeignKey(
      'chats',
      new TableForeignKey({
        columnNames: ['owner_uuid'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'users',
        onDelete: 'SET NULL', // Optional: Set the owner to null if the user is deleted
      }),
    );

    // Create the `chats_participants_users` join table for the many-to-many relationship
    await queryRunner.createTable(
      new Table({
        name: 'chats_participants_users',
        columns: [
          {
            name: 'chat_uuid',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'user_uuid',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    // Create foreign key for the `chat_uuid` in the `chats_participants_users` table
    await queryRunner.createForeignKey(
      'chats_participants_users',
      new TableForeignKey({
        columnNames: ['chat_uuid'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'chats',
        onDelete: 'CASCADE',
      }),
    );

    // Create foreign key for the `user_uuid` in the `chats_participants_users` table
    await queryRunner.createForeignKey(
      'chats_participants_users',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign keys in the `chats_participants_users` table
    await queryRunner.dropForeignKey('chats_participants_users', 'FK_chat_uuid');
    await queryRunner.dropForeignKey('chats_participants_users', 'FK_user_uuid');

    // Drop the `chats_participants_users` join table
    await queryRunner.dropTable('chats_participants_users');

    // Drop the foreign key for the `owner_uuid` in the `chats` table
    await queryRunner.dropForeignKey('chats', 'FK_owner_uuid');

    // Drop the `chats` table
    await queryRunner.dropTable('chats');
  }
}

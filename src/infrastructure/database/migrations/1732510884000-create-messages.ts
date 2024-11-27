import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMessageEntityMigration1732510884000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the `messages` table
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'uuid',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'media_url',
            type: 'varchar',
            isNullable: true, 
          },
          {
            name: 'sender_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'chat_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'sent_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
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

    // Create the foreign key relation for `sender_id` (many-to-one with `users`)
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['sender_id'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // If the user is deleted, cascade deletion of messages
      }),
    );

    // Create the foreign key relation for `chat_id` (many-to-one with `chats`)
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        columnNames: ['chat_id'],
        referencedColumnNames: ['uuid'],
        referencedTableName: 'chats',
        onDelete: 'CASCADE', // If the chat is deleted, cascade deletion of messages
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign keys
    await queryRunner.dropForeignKey('messages', 'FK_sender_id');
    await queryRunner.dropForeignKey('messages', 'FK_chat_id');

    // Drop the `messages` table
    await queryRunner.dropTable('messages');
  }
}

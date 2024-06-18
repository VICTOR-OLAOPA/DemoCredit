import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });

  await knex.schema.createTable('wallets', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.decimal('balance', 15, 2).defaultTo(0);
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });

  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary();
    table.integer('wallet_id').unsigned().notNullable();
    table.decimal('amount', 15, 2).notNullable();
    table.enu('type', ['fund', 'transfer', 'withdraw']).notNullable();
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.foreign('wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transactions');
  await knex.schema.dropTableIfExists('wallets');
  await knex.schema.dropTableIfExists('users');
}



exports.up = knex => knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.text('nome').notNullable();
    table.string('senha').notNullable();
});

exports.down = knex => knex.schema.dropTable('users');
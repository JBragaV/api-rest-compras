

exports.up = knex => knex.schema.createTable("produtos",table => {
    table.increments('id')
    table.string('nome').notNullable()
    table.integer('quantidade').notNullable()
    table.timestamp("created_at").default(knex.fn.now())
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.integer('lista_id').notNullable().unsigned()
    table.foreign('lista_id').references('listas')
});
exports.down = knex => knex.schema.dropTable("produtos");
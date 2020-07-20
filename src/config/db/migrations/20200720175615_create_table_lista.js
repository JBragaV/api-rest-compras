

exports.up = knex => knex.schema.createTable("listas", table => {
    table.increments('id')
    table.string("nome").default("atual")
})


exports.down = knex => knex.schema.dropTable("lista");
//criar alterações através da migrations
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("created_up").default(knex.fn.now());

});

//desfazer alterações realizadas pela migrations
exports.down = knex => knex.schema.dropTable("notes");
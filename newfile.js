
exports.up = function(knex, Promise) {
  knex.schema.createTable("description", function(table) {
    table.increments();
    table.string("description");
    table.date("date_achieved");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("description");
};

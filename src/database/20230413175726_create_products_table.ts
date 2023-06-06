import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("products", (table) => {
    table.increments();
    table.string("title").notNullable();
    table.double("price").notNullable();
    table.string("description").notNullable();
    table.string("image");
    table.double("rate").notNullable;
    table.integer("count").notNullable;
    table.integer("category_id");
    table.foreign("category_id").references("categories.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products");
}

import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

const insertAllCategories = async () => {
  const categories = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());

  await knexInstance("categories").insert(
    categories.map((category: string) => {
      return {
        name: category,
      };
    })
  );
};

insertAllCategories();

import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

type Category = {
  id?: number;
  name: string;
  image: string;
};

const selectAllCategories = async () => {
  return await knexInstance("categories").select("*");
};

const verifyCategory = async (category: string) => {
  return await knexInstance("categories")
    .select("id")
    .where({ name: category });
};

const selectCategoryById = async (id: string) => {
  return await knexInstance("categories").select("id").where({ id });
};

const selectProductsByCategory = async (id: string) => {
  return await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "products.image",
      "products.rate",
      "products.count",
      "categories.name as category"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ category_id: id });
};

const insertCategory = async (category: Category) => {
  return await knexInstance("categories").insert(category);
};

const updateCategory = async (id: string, category: Category) => {
  return await knexInstance("categories").update(category).where({ id });
};

const deleteCategory = async (id: string) => {
  return await knexInstance("categories").delete().where({ id });
};
export default {
  selectAllCategories,
  verifyCategory,
  selectCategoryById,
  selectProductsByCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
};

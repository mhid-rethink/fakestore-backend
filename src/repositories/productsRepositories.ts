import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

type Product = {
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
  rate?: number;
  count?: number;
  category?: string;
  category_id?: number;
};

const verifyCategory = async (category: string) => {
  return await knexInstance("categories")
    .select("id")
    .where({ name: category });
};

const insertProduct = async (product: Product) => {
  return await knexInstance.insert(product).into("products");
};

const selectAllProducts = async () => {
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
    .join("categories", "categories.id", "=", "products.category_id");
};

const selectProductById = async (id: string) => {
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
    .where({ "products.id": id });
};

const selectProductByName = async (name: string) => {
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
    .where("products.title", "like", `%${name}%`);
};

const udpateProductById = async (id: string, updatedProduct: Product) => {
  return await knexInstance("products")
    .update(updatedProduct)
    .where({ id: id });
};

const deleteProductById = async (id: string) => {
  return await knexInstance("products").delete().where({ id });
};
export default {
  verifyCategory,
  insertProduct,
  selectAllProducts,
  selectProductById,
  selectProductByName,
  udpateProductById,
  deleteProductById,
};

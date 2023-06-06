import knex from "knex";
import config from "../../knexfile";

const knexInstance = knex(config);

const insertAllProducts = async () => {
  const productsData = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) =>
      products.map(async (product: any) => {
        return {
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          rate: product.rating.rate,
          count: product.rating.count,
          category_id: await findCategory(product.category),
        };
      })
    );

  const promiseResolved = await Promise.all(productsData);

  await knexInstance("products").insert(promiseResolved);
};

const findCategory = async (categoryName: string) => {
  const category = await knexInstance("categories")
    .select("id")
    .where({ name: categoryName });
  const categoryId = category[0].id;

  return categoryId;
};

insertAllProducts();

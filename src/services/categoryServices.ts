import { makeError } from "../middlewares/errorHandler";
import categoryRepositories from "../repositories/categoryRepositories";

type Category = {
  id?: number;
  name: string;
  image: string;
};

const selectAll = async () => {
  const categories = await categoryRepositories.selectAllCategories();
  
  const categoriesMap: Category[] = categories.map((category) => {
    return {
      name: category.name,
      image: category.image,
    };
  });
  return categoriesMap;
};

const selectProductByCategory = async (category: string) => {
  const findCategory = await categoryRepositories.verifyCategory(category);
  if (!findCategory.length) {
    throw makeError({ message: "Essa categoria não existe", status: 400 });
  }

  const categoryId = findCategory[0].id;
  const products = await categoryRepositories.selectProductsByCategory(
    categoryId
  );
  if (!products.length) {
    throw makeError({ message: "Produtos não encontrados", status: 404 });
  }

  const formatedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: {
      rate: product.rate,
      count: product.count,
    },
  }));
  return formatedProducts;
};

const insertCategory = async (category: Category) => {
  const findCategory = await categoryRepositories.verifyCategory(category.name);
  if (findCategory.length) {
    throw makeError({ message: "Essa categoria já existe", status: 422 });
  }

  const id: number[] = await categoryRepositories.insertCategory(category);
  return { id: id[0], category };
};

const updateCategoryById = async (id: string, udpatedCategory: Category) => {
  const findCategory = await categoryRepositories.selectCategoryById(id);
  console.log(findCategory);

  if (!findCategory.length) {
    throw makeError({ message: "Essa categoria não existe", status: 400 });
  }

  await categoryRepositories.updateCategory(id, udpatedCategory);

  return { msg: "categoryUpdated", udpatedCategory };
};

const deleteCategoryById = async (id: string) => {
  const findCategory = await categoryRepositories.selectCategoryById(id);
  console.log(findCategory);

  if (!findCategory) {
    throw makeError({ message: "Essa categoria não existe", status: 400 });
  }

  const category = await categoryRepositories.deleteCategory(id);
  console.log(category);
  if (!category) {
    throw makeError({
      message: "Categoria não pôde ser deletada",
      status: 409,
    });
  }

  return { msg: "Categoria deletada" };
};

export default {
  selectAll,
  selectProductByCategory,
  insertCategory,
  updateCategoryById,
  deleteCategoryById,
};

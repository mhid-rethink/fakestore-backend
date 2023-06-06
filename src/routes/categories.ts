import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import middleware from "../middlewares/dataValidator";
const categories: Router = Router();
const category: Router = Router();

categories.get("/", categoriesController.index);
category.get(
  "/:category",
  middleware.categoryIdValidator,
  categoriesController.show
);
categories.post("/", categoriesController.insert);
categories.put(
  "/:id",
  middleware.categoriesIdValidator,
  middleware.categoriesDataValidator,
  categoriesController.update
);
categories.delete(
  "/:id",
  middleware.categoriesIdValidator,
  categoriesController.remove
);

export { categories, category };

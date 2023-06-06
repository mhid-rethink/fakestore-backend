import { Response, Request, NextFunction } from "express";
import categoryServices from "../services/categoryServices";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categoriesNames = await categoryServices.selectAll();
    res.status(200).json(categoriesNames);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category: string = req.params.category;
    const formatedProducts = await categoryServices.selectProductByCategory(
      category
    );

    res.status(200).json(formatedProducts);
  } catch (error) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.body;

    const newCategory = await categoryServices.insertCategory(category);

    res.status(201).json(newCategory);
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;
    const udpatedCategory = req.body;

    const result = await categoryServices.updateCategoryById(id, udpatedCategory);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = req.params.id;

    const result = await categoryServices.deleteCategoryById(id);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export default { index, show, insert, update, remove };

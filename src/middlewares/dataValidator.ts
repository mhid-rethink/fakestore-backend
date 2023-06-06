import { NextFunction, Request, Response } from "express";
import { object, string, number } from "yup";

export const productPathValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = req.params.id;
    const productData = req.body;

    const paramsSchema = string().required("Id é obrigatório").min(1);

    const productSchema = object({
      title: string(),
      price: number(),
      description: string(),
      image: string(),
      rate: number(),
      count: number(),
      category: string(),
      rating: object({
        rate: number(),
        count: string(),
      }),
    });

    await paramsSchema.validate(paramsData);
    await productSchema.validate(productData);
    next();
  } catch (error) {
    next(error);
  }
};

const productDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productData = req.body;

    const productSchema = object({
      title: string().required(),
      price: number().required(),
      description: string().required(),
      image: string().required(),
      rate: number().required(),
      count: number().required(),
      category: string().required(),
      rating: object({
        rate: number().required(),
        count: string().required(),
      }),
    });

    await productSchema.validate(productData);
    next();
  } catch (error) {
    next(error);
  }
};

const categoryIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryData = req.params;

    const paramsSchema = object({
      category: string().required("Nome da categoria é obrigatório"),
    });

    await paramsSchema.validate(categoryData);
    next();
  } catch (error) {
    next(error);
  }
};

const categoriesIdValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paramsData = parseInt(req.params.id);

    const paramsSchema = number().required("Id é obrigatório").min(1);

    await paramsSchema.validate(paramsData);

    next();
  } catch (error) {
    next(error);
  }
};

const categoriesDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriesData = req.body;

    const categoriesSchema = object({
      name: string().required(),
    });

    await categoriesSchema.validate(categoriesData);
    next();
  } catch (error) {
    next(error);
  }
};

export default {
  productDataValidator,
  productPathValidator,
  categoryIdValidator,
  categoriesIdValidator,
  categoriesDataValidator,
};

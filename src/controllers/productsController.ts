import { Response, Request, NextFunction } from "express";
import productsServices from "../services/productsServices";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productsMap = await productsServices.selectAll();

    res.status(200).json(productsMap);
  } catch (error) {
    next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const productsMap = isNaN(parseInt(id))
      ? await productsServices.selectByName(id)
      : await productsServices.selectById(id);

    res.status(200).json(isNaN(parseInt(id)) ? productsMap : productsMap[0]);
  } catch (error) {
    next(error);
  }
};

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    const newProduct = await productsServices.createProduct(product);
    res.status(200).json({
      id: newProduct[0],
      ...product,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProduct = req.body;
    const id = req.params.id;

    await productsServices.udpateProduct(id, updatedProduct);

    res.send({ msg: "productUpdated" });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    await productsServices.deleteProduct(id);

    res.status(200).json({ msg: "Produto deletado" });
  } catch (error) {
    next(error);
  }
};

export default { index, show, insert, update, remove };

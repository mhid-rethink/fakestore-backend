import { Router } from "express";
import { router as productsRouter } from "./products";
import { router as userRouter } from "./users";

const router: Router = Router();

router.use("/products", productsRouter);
router.use("/login", userRouter);

export { router };

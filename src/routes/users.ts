import { Router } from "express";
import usersController from "../controllers/usersController";

const router: Router = Router();

router.post("/newUser", usersController.newUser);
router.post("/", usersController.login);

export { router };

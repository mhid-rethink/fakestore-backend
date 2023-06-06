import { Response, Request, NextFunction } from "express";
import usersServices from "../services/usersServices";

const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: { login: string; password: string } = req.body;

    await usersServices.createUser(user);
    res.status(200).json({ msg: "usuario criado com sucesso" });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: { login: string; password: string } = req.body;
    console.log(user);
    const token = await usersServices.loginUser(user);
    console.log(token);

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default { newUser, login };

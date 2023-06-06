import { makeError } from "../middlewares/errorHandler";
import usersRepositories from "../repositories/usersRepositories";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const hash = await bcrypt.hash(password, Number(process.env.SALT!));

  const insertedUser: number[] = await usersRepositories.insertUser({
    login,
    password: hash,
  });

  return insertedUser[0];
};

const loginUser = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const userFromDatabase = await usersRepositories.getUser({ login });
  const verify = await bcrypt.compare(password, userFromDatabase.password);

  console.log("userFromDatabase");
  console.log(userFromDatabase);
  console.log("verify");
  console.log(verify);

  if (!verify) throw makeError({ message: "erro de login", status: 500 });

  return jwt.sign(
    {
      userId: userFromDatabase.id,
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "7 days" }
  );
};

export default { createUser, loginUser };

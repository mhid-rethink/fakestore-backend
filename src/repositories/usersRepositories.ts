import knex from "knex";
import knexConfig from "../../knexfile";

const knexInstance = knex(knexConfig);

type User = {
  login: string;
  password: string;
  id: number;
};
const insertUser = async (user: { login: string; password: string }) => {
  const insertedUser: number[] = await knexInstance.insert(user).into("users");
  return insertedUser;
};

const getUser: (login: { [key: string]: string | number }) => Promise<{
  login: string;
  password: string;
  id: number;
}> = async (where) => {
  const user = await knexInstance.select("*").from("users").where(where);

  return user[0];
};

const updateUser = async (
  id: string,
  user: { login: string; password: string }
) => {
  return await knexInstance("users").update(user).where({ id });
};

const deleteUser = async (id: string) => {
  return await knexInstance("users").delete().where({ id });
};

export default {
  getUser,
  insertUser,
  updateUser,
  deleteUser,
};

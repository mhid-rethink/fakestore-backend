import { errorHandler } from "./middlewares/errorHandler";
import express, { Request, Response } from "express";
import { router } from "./routes";
import * as dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const app = express();
const port = 3030;

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Fake store rest API for your e-commerce or shopping website prototype"
  );
});

app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

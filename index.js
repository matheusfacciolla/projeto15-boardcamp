import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import categoryRouter from "./src/routes/categoryRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(categoryRouter);

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green(`Server is running at http://localhost:${process.env.PORT}`))
});
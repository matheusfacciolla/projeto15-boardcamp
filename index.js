import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import categoriesRouter from "./src/routes/categoriesRouter.js";
import gamesRouter from "./src/routes/gamesRouter.js";
import customersRouter from "./src/routes/customersRouter.js";
import rentalsRouter from "./src/routes/rentalsRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);
app.use(rentalsRouter);

app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green(`Server is running at http://localhost:${process.env.PORT}`))
});
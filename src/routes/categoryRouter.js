import { Router } from "express";

import { getAllCategories, addCategory } from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoriesMiddleware.js";

const categoryRouter = Router();

categoryRouter.get("/categories", getAllCategories);
categoryRouter.post("/categories", validateCategory, addCategory);

export default categoryRouter;
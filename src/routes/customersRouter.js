import { Router } from "express";

import { getAllCustomers, getCustomerById, addCustomer } from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/customersMiddlewares.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateCustomer, addCustomer);

export default customersRouter;
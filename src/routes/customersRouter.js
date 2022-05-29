import { Router } from "express";

import { getAllCustomers, getCustomerById, addCustomer, attCustomer } from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/customersMiddlewares.js";

const customersRouter = Router();

customersRouter.get("/customers", getAllCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateCustomer, addCustomer);
customersRouter.put("/customers/:id", validateCustomer, attCustomer);

export default customersRouter;
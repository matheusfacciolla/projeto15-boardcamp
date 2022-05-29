import { Router } from "express";

import { getAllRentals, addRental } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getAllRentals);
rentalsRouter.post("/rentals", validateRental, addRental);
//rentalsRouter.post("/rentals");
//rentalsRouter.delete("/rentals");

export default rentalsRouter;
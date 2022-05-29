import { Router } from "express";

import { getAllRentals, addRental, finishRental, deleteRental } from "../controllers/rentalsController.js";
import { validateRental, validateDeleteAndFinishRental } from "../middlewares/rentalsMiddlewares.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getAllRentals);
rentalsRouter.post("/rentals", validateRental, addRental);
rentalsRouter.post("/rentals/:id/return", validateDeleteAndFinishRental, finishRental);
rentalsRouter.delete("/rentals/:id", validateDeleteAndFinishRental, deleteRental);

export default rentalsRouter;
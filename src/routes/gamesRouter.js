import { Router } from "express";

import { getAllGames, addGame } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getAllGames);
gamesRouter.post("/games", validateGame, addGame);

export default gamesRouter;
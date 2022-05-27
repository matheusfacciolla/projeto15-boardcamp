import connection from "../../db.js";

import { gameSchema } from "../schemas/gameSchemas.js";

export async function validateGame(req, res, next) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    const { error } = gameSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error)
        res.status(400).send(error.details.map((detail) => detail.message));
        return;
    }
    
    try {
        const resultName = await connection.query(`SELECT * FROM games WHERE name = $1`, [name]);
        const resultCategoryId = await connection.query(`SELECT * FROM categories WHERE id = $1`, [categoryId]);
        
        if (resultName.rows[0]) {
            res.sendStatus(409);
            return;
        }

        if(!resultCategoryId.rows[0]){
            res.sendStatus(400);
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o jogo!");
        return;
    }

    next();
}
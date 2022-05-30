import connection from "../../db.js";

import { rentalSchema } from "../schemas/rentalSchemas.js";

export async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const { error } = rentalSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error)
        res.status(400).send(error.details.map((detail) => detail.message));
        return;
    }

    try {
        const resultCustomerId = await connection.query(`SELECT * FROM customers WHERE id = $1;`, [customerId]);
        const resultGameId = await connection.query(`SELECT * FROM games WHERE id = $1;`, [gameId]);
        const resultRentals = await connection.query(`SELECT * FROM rentals`);
        const resultGames = await connection.query(`SELECT * FROM games`);

        let sumOfGames = 0;

        for (let resultGame of resultGames.rows) {
            sumOfGames += resultGame.stockTotal;
        }

        console.log("SOMA", sumOfGames)


        if (!resultGameId.rows[0] || !resultCustomerId.rows[0] || daysRented <= 0 || resultRentals.rows.length > sumOfGames) {
            res.sendStatus(400);
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro...");
        return;
    }

    next();
}

export async function validateDeleteAndFinishRental(req, res, next) {
    const { id } = req.params;

    try {
        const resultRentals = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
        if(!resultRentals.rows[0]){
            res.sendStatus(404);
            return;
        }
    
        if(resultRentals.rows[0].returnDate != null){
            res.sendStatus(400);
            return;
        }

    } catch(e){
        console.log(e);
        res.status(500).send("Ocorreu um erro...");
        return;
    }
}
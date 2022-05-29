import connection from "../../db.js";

import { rentalSchema } from "../schemas/rentalSchemas.js";

export async function validateRental(req, res, next) {
    const { customerId, gameId, daysRented } = req.body;
    const { error } = rentalSchema.validate(req.body, { abortEarly: false });

    //Ao inserir um aluguel, deve-se validar que existem jogos disponíveis, 
    //ou seja, que não tem alugueis em aberto acima da quantidade de jogos em estoque.
    //Caso contrário, deve retornar status 400

    if (error) {
        console.log(error)
        res.status(400).send(error.details.map((detail) => detail.message));
        return;
    }
    
    try {
        const resultCustomerId = await connection.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);
        const resultGameId = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        
        if (!resultGameId.rows[0] || !resultCustomerId.rows[0] || daysRented <= 0) {
            res.sendStatus(400);
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o aluguel!");
        return;
    }

    next();
}
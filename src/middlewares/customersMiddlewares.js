import connection from "../../db.js";

import { customerSchema } from "../schemas/customerSchemas.js";

export async function validateCustomer(req, res, next) {
    const { name, phone, cpf, birthday } = req.body;
    const { error } = customerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error)
        res.status(400).send(error.details.map((detail) => detail.message));
        return;
    }
    
    try {
        const result = await connection.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);   
        if (result.rows[0]) {
            res.sendStatus(409);
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o cliente!");
        return;
    }

    next();
}
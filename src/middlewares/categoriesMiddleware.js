import connection from "../../db.js";

import { categorySchema } from "../schemas/categorySchemas.js";

export async function validateCategory(req, res, next) {
    const { name } = req.body;
    const { error } = categorySchema.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(400).send(error.details.map((detail) => detail.message));
        return;
    }

    try {
        const result = await connection.query(`SELECT * FROM categories WHERE name = $1`, [name]);
        if (result.rows[0]) {
            res.sendStatus(409);
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar a categoria");
        return;
    }

    next();
}
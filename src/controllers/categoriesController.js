import connection from "../../db.js";

export async function getAllCategories(req, res) {
    try {
        const result = await connection.query("SELECT * FROM categories");
        res.send(result.rows);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter as categorias!");
        return;
    }
}

export async function addCategory(req, res) {
    const { name } = req.body;

    try {
        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar a categoria!");
        return;
    }
}
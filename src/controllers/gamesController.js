import connection from "../../db.js";

export async function getAllGames(req, res) {
    const { name } = req.query;

    try {
        //tentar resolver problema da letra maiuscula na querystring !!!!
        if (name) {
            const result = await connection.query(`SELECT * FROM games WHERE name LIKE $1`, [`${name}%`]);
            console.log("RESULT QUERY", result.rows)
            res.status(200).send(result.rows);
        }

        const result = await connection.query("SELECT * FROM games");
        res.send(result.rows);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os jogos!");
        return;
    }
}

export async function addGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(`
        INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5);
        `, [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o jogo!");
        return;
    }
}
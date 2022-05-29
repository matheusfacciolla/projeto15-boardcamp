import dayjs from "dayjs";

import connection from "../../db.js";

export async function getAllRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        if (customerId || gameId) {
            const result = await connection.query(`SELECT * FROM rentals WHERE (name LIKE $1 OR name LIKE $2)`, [`${customerId}%`, `${gameId}%`]);
            res.status(200).send(result.rows);
        } else {
            const result = await connection.query("SELECT * FROM rentals");
            res.send(result.rows);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os aluguéis!");
        return;
    }
}

export async function addRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const originalPrice = daysRented * pricePerDay;
    const rentDate = dayjs(Date.now()).format("YYYY-MM-DD");

    try {
        await connection.query(`
        INSERT INTO games ("customerId", "gameId", "daysRented", "returnDate", "delayFee", "originalPrice", "rentDate") 
        VALUES ($1, $2, $3);
        `, [customerId, gameId, daysRented, originalPrice, rentDate]);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o aluguél!");
        return;
    }
}
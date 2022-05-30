import dayjs from "dayjs";
import moment from 'moment';

import connection from "../../db.js";

export async function getAllRentals(req, res) {
    const { customerId, gameId } = req.query;

    try {
        if (customerId || gameId) {
            const resultCustomerId = await connection.query(`SELECT * FROM rentals WHERE "customerId" = $1`, [customerId]);
            const resultGameId = await connection.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [gameId]);

            if (resultCustomerId.rows.length != 0) {
                res.status(200).send(resultCustomerId.rows);
            }

            if (resultGameId.rows.length != 0) {
                res.status(200).send(resultGameId.rows);
            }

        } else {
            const result = await connection.query(`
            SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName", categories.id AS "categoryId", categories.name AS "categoryName" 
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId"
            JOIN categories ON games."categoryId" = categories.id;
        `)

            let rentals = result.rows;
            const rentalsList = [];

            for (let rental of rentals) {
                rental = {
                    ...rental,
                    customer: {
                        id: rental.customerId,
                        name: rental.customerName
                    },
                    game: {
                        id: rental.gameId,
                        name: rental.gameName,
                        categoryId: rental.categoryId,
                        categoryName: rental.categoryName
                    }
                }

                rentalsList.push(rental);
            }

            res.status(200).send(rentalsList);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os aluguéis!");
        return;
    }
}

export async function addRental(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    try {
        const resultGames = await connection.query(`SELECT * FROM games WHERE id = $1`, [gameId]);
        const originalPrice = daysRented * resultGames.rows[0].pricePerDay;
        const rentDate = dayjs(Date.now()).format("YYYY-MM-DD");

        await connection.query(`
        INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") 
        VALUES ($1, $2, $3, $4, $5);
        `, [customerId, gameId, rentDate, daysRented, originalPrice]);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao registrar o aluguel!");
        return;
    }
}

export async function finishRental(req, res) {
    const { id } = req.params;

    try {
        const result = await connection.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
        const returnDate = moment(dayjs(Date.now()).format("YYYY-MM-DD"));
        const rentDate = moment(dayjs(result.rows[0].rentDate).format("YYYY-MM-DD"));

        const days = returnDate.diff(rentDate, 'day');
        const delayFee = days > 0 ? (result.rows[0].originalPrice / result.rows[0].daysRented) : 0;

        await connection.query(`
        UPDATE rentals 
        SET "returnDate" = $1, "delayFee" = $2 
        WHERE id = $3;`,
            [returnDate, delayFee, id]);
        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao finalizar o aluguel!");
        return;
    }
}

export async function deleteRental(req, res) {
    const { id } = req.params;

    try {
        await connection.query(`DELETE FROM rentals WHERE id = $1;`, [id]);
        res.sendStatus(200);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao deletar o aluguel!");
        return;
    }
}
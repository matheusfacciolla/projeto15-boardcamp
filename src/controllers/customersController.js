import connection from "../../db.js";

export async function getAllCustomers(req, res) {
    const { cpf } = req.query;

    try {
        if (cpf) {
            const result = await connection.query(`SELECT * FROM customers WHERE cpf LIKE $1`, [cpf`%`]);
            res.status(200).send(result.rows);
        } else {
            const result = await connection.query("SELECT * FROM customers");
            res.send(result.rows);
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os clientes!");
        return;
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    try {
        const result = await connection.query(`SELECT * FROM customers WHERE id = $1`, [id]);

        if (id) {
            res.status(200).send(result.rows);
            return;
        }

        if (!result.rows[0]) {
            res.status(404).send("Usuário não existe!");
            return;
        }

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro ao obter os clientes!");
        return;
    }
}

export async function addCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(`
        INSERT INTO customers (name, phone, cpf, birthday) 
        VALUES ($1, $2, $3, $4);
        `, [name, phone, cpf, birthday]);
        res.sendStatus(201);

    } catch (e) {
        console.log(e);
        res.status(500).send("Ocorreu um erro registrar o cliente!");
        return;
    }
}
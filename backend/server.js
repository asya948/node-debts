import express from 'express';
import db from "./config/db.js";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
});

app.get('/debts/:id', async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.query('SELECT * FROM debts WHERE user_id=?', [id]);
    res.json(rows);
});

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.query('SELECT * FROM users WHERE id=?', [id]);
    res.json(rows);
});

app.post('/user', async (req, res) => {
    const { name, email } = req.body;

    const [query] = await db.query(
        'INSERT INTO users (name,email) VALUES (?,?)',
        [name, email]
    );

    res.json({
        id: query.insertId,
        name,
        email
    });
});

app.post('/debt', async (req, res) => {
    const { user_id, name, price } = req.body;

    if (!user_id || !name || !price) {
        return res.json({ error: 'please enter valid data' });
    }

    const [query] = await db.query(
        'INSERT INTO debts (name,user_id,price) VALUES (?,?,?)',
        [name, user_id, price]
    );

    res.json({
        id: query.insertId,
        name,
        price,
        user_id
    });
});

app.delete('/debt/:id', async (req, res) => {
    const id = req.params.id;

    await db.query('DELETE FROM debts WHERE id=?', [id]);

    res.json({ message: 'deleted debt from user' });
});

app.get('/debts', async (req, res) => {
    const [rows] = await db.query('SELECT * FROM debts');
    res.json(rows);
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    await db.query('DELETE FROM users WHERE id=?', [id]);

    res.json({ message: 'deleted user' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
const express = require("express");
const mysql = require("mysql2");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// Conecto ao meu banco de dados
const connection = mysql.createPool({
    connectionLimit: 10,
    host: 'db' || 'localhost',
    user: 'root',
    password: "Valfenda25!",
    database: "livros",
    port: 3306
});
app.set('view engine', 'ejs');
// Criação das rotas API
// GET todos os livros registrados na database.
app.get("/", (req, res) => {
    connection.query("SELECT * FROM book", (err, results) => {
        if (err) {
            res.json({
                success: false,
                err,
            });

        } else {
            res.render('index', { results });
        }
    });
});
// Realiza a busca pelo titulo do livro
app.get('/buscar', (req, res) => {
    const { titulo } = req.query;
    const query = `SELECT * FROM book WHERE book_name LIKE '%${titulo}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar livro por título:', err);
            res.send('Erro ao buscar livro por título.');
            return;
        }
        res.render('index', { results });
    });
});

// Realiza a adição de um livro novo
app.post('/adicionar', (req, res) => {
    const { book_name, book_author, release_year } = req.body;
    const query = 'INSERT INTO book (book_name, book_author, release_year) VALUES (?, ?, ?)';
    connection.query(query, [book_name, book_author, release_year], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar livro:', err);
            return;
        }
        res.redirect('/');
    });
});

// Deleta um livro específico
app.delete('/deletar/:id', (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM book WHERE book_id = ?';
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar livro:', err);
            res.send('Erro ao deletar livro.');
            return;
        }
        res.sendStatus(200);
    });
});
// A aplicacação vai rodar na porta 3000
app.listen(3000, () => console.log("listining on port 3000"));
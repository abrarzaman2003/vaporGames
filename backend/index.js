const mysql = require('mysql');
const express = require('express');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Game_World',
  port: 3306
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});


const app = express();

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM GAME', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
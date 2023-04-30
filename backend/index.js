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

// gets all the games from the database and sorts them by release date

app.get('/games', (req, res) => {
  connection.query(
    'SELECT * FROM GAME ORDER BY GAME.RELEASE_DATE DESC;',
     (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// gets a game by its name
app.get('/games/:name', (req, res) => {
    connection.query(
      'SELECT * FROM GAME WHERE GAME.ID ='+[req.params.name],
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

// a user can add a game to their wishlist
app.post('/wishlist/:gid/:uid'), (req, res) => {
    connection.query(
      'INSERT INTO WISHLISTS (GID, UID) VALUES (' + [req.params.gid] + ',' + [req.params.uid] + ')', 
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
};

// a user can view their wishlist
app.get('/wishlist/:uid', (req, res) => {
    connection.query(
      'SELECT * FROM WISHLISTS WHERE UID ='+ [req.params.uid],
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

// a user can remove a game from their wishlist
app.delete('/wishlist/:gid/:uid'), (req, res) => {
    connection.query(
      'DELETE FROM WISHLISTS WHERE GID ='+ [req.params.gid] +'' + 'AND UID ='+ [req.params.uid], 
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
};

// a user can view games of a certain genre
app.get('/genre/:genre', (req, res) => {
    connection.query(
      'SELECT * FROM GAME WHERE GAME.TYPE ='+ [req.params.genre],
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});

// a user can view games of a certain publisher
app.get('/publisher/:publisherID', (req, res) => {
    connection.query(
      'SELECT * FROM GAME JOIN PUBLISHERS ON GAME.PID ='+ [req.params.publisherID],
      (err, results) => {
        if (err) throw err;
        res.json(results);
    })
});




app.listen(3000, () => {
  console.log('Server started on port 3000');
});
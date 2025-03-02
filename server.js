const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'wdcpa'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Route to handle user input
app.post('/loginn', (req, res) => {
  const { email, password } = req.body.login;
  const sql = 'INSERT INTO user (email,password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send("User added successfully");
  });
});

// Route to get all users
app.get('/user', (req, res) => {
  const sql = 'SELECT * FROM user';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
});

const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
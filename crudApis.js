const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "learner"
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log("Conexiune la baza de date cu success");
  } else {
    console.log("Eroare la conexiune cu baza de date");
  }
});

const port = process.env.port || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/learners", (req, res) => {
  mysqlConnection.query("Select * from learnerdetails", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

app.get("/learners/:id", (req, res) => {
  mysqlConnection.query(
    "Select * from learnerdetails where learner_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/learners", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

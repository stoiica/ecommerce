const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const authValidation = require("./authentication/authValidation");

const app = express();
const authPrivateKey = "privateKey";
const PORT = 3000;
app.use(bodyParser.json());

// DB connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecommerce"
});

connection.connect(err => {
  if (!err) {
    console.log("Connected to DB!");
  } else {
    console.log(err);
  }
});

// Handling home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Handling login requests
app.get("/auth/login", (req, res) => {
  res.sendFile(path.join(__dirname + "/authentication/login.html"));
});

app.post("/auth/login", (req, res) => {
  authValidation
    .validateLogin(connection, req.body.username, req.body.password)
    .then(response => {
      if (response) {
        jwt.sign(
          { username: req.body.username },
          authPrivateKey,
          (err, token) => {
            if (!err) {
              res.send({ token });
            }
          }
        );
      } else {
        res.send({ err: "Incorrect credentials" });
      }
    });
});

//Handling registration
app.get("/auth/register", (req, res) => {
  res.sendFile(path.join(__dirname + "/authentication/register.html"));
});

app.post("/auth/register", (req, res) => {
  authValidation
    .validateRegister(connection, req.body.username, req.body.password)
    .then(response => {
      jwt.sign(
        {
          username: req.body.username
        },
        authPrivateKey,
        (err, token) => {
          if (!err) {
            res.send({ token });
          }
        }
      );
    })
    .catch(err => {
      res.send({ err: "Username already used!" });
    });
});

// Starting the server and setting the static directory
app.use(express.static(__dirname + "/"));
app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

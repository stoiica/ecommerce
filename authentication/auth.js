const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/auth", (req, res) => {
  res.json({
    message: "Welcome to the api"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (!err) {
      res.json({
        message: "Post created",
        authData: authData
      });
    } else {
      res.sendStatus(403);
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com"
  };
  jwt.sign({ user: user }, "secretKey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token: token
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

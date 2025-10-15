const express = require("express");
const app = express();

let count = 0;

const requestCounter = (req, res, next) => {
  count++;
  next();
};

app.use(requestCounter);

app.get("/user", (req, res) => {
  res.json("Hii i am user");
});

app.get("/client", (req, res) => {
  res.json("Hii i am user");
});

app.get("/count", (req, res) => {
  res.status(200).json({ message: `Your total counts are ${count}`});
});

app.listen(3000,()=>console.log("Succesfully working on port 3000"))
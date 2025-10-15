const express = require("express");
const app = express();

const checkAge = (req, res, next) => {
  let age = req.query.age;
  if (age >= 18) {
    return next();
  }
  return res.status(401).json({ message: "You are not eligible to vote!" });
};

app.use(checkAge);

app.get("/pmElection", (req, res) => {
  return res.status(200).json({ message: "You are eligible to vote!" });
});

app.get("/cmElection", (req, res) => {
  return res.status(200).json({ message: "You are eligible to vote!" });
});

app.listen(3000, () => console.log("Succesfully working on port 3000"));

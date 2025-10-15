const express = require("express");
const app = express();

let totalRequestPerS = {};

// Reset the request count every second
setInterval(() => {
  totalRequestPerS = {};
}, 1000);

app.use((req, res, next) => {
  const user = req.headers["user-id"];

  if (!user) {
    return res.status(400).json({ message: "User-ID header is required" });
  }

  // Initialize counter if user not present
  if (!totalRequestPerS[user]) {
    totalRequestPerS[user] = 1;
    return next();
  }

  // Increment request count
  totalRequestPerS[user]++;

  // Check limit
  if (totalRequestPerS[user] > 5) {
    return res.status(429).json({ message: "Too many requests! Try again later." });
  }

  next();
});

app.get("/user", (req, res) => {
  res.json("Hi, I am user");
});

app.get("/client", (req, res) => {
  res.json("Hi, I am client");
});

app.listen(3000, () => console.log("Server running on port 3000"));

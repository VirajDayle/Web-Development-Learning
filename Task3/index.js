const fs = require("fs");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const file = "todo.json";

function ReadFile() {
  if (!fs.existsSync(file)) return { users: [] };
  let data = fs.readFileSync(file, "utf-8");
  try {
    return JSON.parse(data);
  } catch {
    return { users: [] };
  }
}

function WriteFile(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
}

app.post("/addTodo", (req, res) => {
  const { userName, title } = req.body;
  const now = new Date();

  if (!userName || !title) {
    return res.status(400).json({ message: "userName and title are required" });
  }

  let data = ReadFile();
  let userIndex = data.users.findIndex((user) => user.name === userName);

  if (userIndex === -1) {
    data.users.push({
      id: uuidv4(),
      name: userName,
      todo: [
        {
          title,
          time: now.toLocaleTimeString(),
        },
      ],
    });
  } else {
    data.users[userIndex].todo.push({
      title,
      time: now.toLocaleTimeString(),
    });
  }

  WriteFile(data);
  res.json({ message: "Todo added successfully!", data });
});

app.delete("/delete", (req, res) => {
  const { userName, title } = req.body;

  if (!userName || !title) {
    return res.status(400).json({ message: "userName and title are required" });
  }

  let data = ReadFile();
  let userIndex = data.users.findIndex((user) => user.name === userName);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  let todoIndex = data.users[userIndex].todo.findIndex(
    (todo) => todo.title === title
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  data.users[userIndex].todo.splice(todoIndex, 1);
  WriteFile(data);

  res.json({ message: "Todo deleted successfully!", data });
});

app.put("/update", (req, res) => {
  const { userName, title, newTitle } = req.body;
  if (!userName || !title || !newTitle) {
    return res
      .status(400)
      .json({ message: "userName, title & newTitle are required" });
  }

  let data = ReadFile();
  let userIndex = data.users.findIndex((user) => user.name === userName);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  let todoIndex = data.users[userIndex].todo.findIndex(
    (todo) => todo.title === title
  );
  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  data.users[userIndex].todo[todoIndex].title = newTitle;
  WriteFile(data);

  res.json({ message: "Todo updated successfully!", data });
});

app.get("/allTodo", (req, res) => {
  const { userName } = req.query;
  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  let data = ReadFile();
  let userIndex = data.users.findIndex((user) => user.name === userName);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  let allTodos = data.users[userIndex].todo;
  res.json({ message: "All todos fetched successfully", allTodos });
});

app.listen(4000, () => console.log("✅ Server running on port 4000"));

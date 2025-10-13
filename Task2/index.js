const { program } = require("commander");
const fs = require("fs");
const now = new Date();

const File = "todo.json";

function readTodos() {
  if (!fs.existsSync(File)) return [];
  const data = fs.readFileSync(File, "utf-8");
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeTodo(todos) {
  fs.writeFileSync(File, JSON.stringify(todos, null, 2), "utf-8");
}

program
  .name("todo")
  .description("A CLI to manage your to-do list")
  .version("1.0.0");

program
  .command("list")
  .description("Show All to-do items")
  .action(() => {
    const todos = readTodos();
    if (todos.length == 0) {
      console.log("No to-do present");
      return;
    }
    console.log("Your to-do list : ");
    todos.forEach((todo, i) => {
      console.log(`${i + 1}. ${todo.title}`);
    });
  });

program
  .command("add <item>")
  .description("Add item to the todo")
  .action((item) => {
    const todos = readTodos();
    const index = todos.findIndex((todo) => todo.title === item);
    if (index !== -1) {
      console.log("Already present");
      return;
    }
    todos.push({ title: item, time: `${now.toLocaleTimeString()}` });
    writeTodo(todos);
    console.log(`Added : "${item}"`);
  });

program
  .command("update <item> <updatedItem>")
  .description("Add item to the todo")
  .action((item, updatedItem) => {
    const todos = readTodos();
    const index = todos.findIndex((todo) => todo.title === item);
    if (index === -1) {
      console.log("Todo not exist.");
      return;
    }
    todos[index].title = updatedItem;
    writeTodo(todos);
    console.log(`updtaed : "${updatedItem}"`);
  });

program
  .command("remove <item>")
  .description("Remove item from the todo")
  .action((item) => {
    const todos = readTodos();
    const index = todos.findIndex((todo) => todo.title === item);
    if (index === -1) {
      console.log("Todo not exist.");
      return;
    }
    const removed = todos.splice(index, 1);
    writeTodo(todos);
    console.log(`Remove : "${item}"`);
  });

program.parse();

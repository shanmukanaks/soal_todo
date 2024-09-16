const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors()); // enable CORS for all routes, allows us to access the backend from our frontend port
app.use(bodyParser.json()); // parse JSON request bodies

// In-memory database
let users = []; // stores user information
let todos = []; // stores todo items

// authenticate our users
const authenticateUser = (req, res, next) => {
  const { username, password } = req.headers;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    req.user = user; // attach user object to request
    next(); // go to next middleware/route handler
  } else {
    res.status(401).json({ message: "Authentication failed" });
  }
};

// register user
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // check if user already registered
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  // create new user
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);
  res.status(201).json({ message: "User registered successfully" });
});

// log user in
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ message: "Login successful", userId: user.id });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// get all todos for a user
app.get("/todos", authenticateUser, (req, res) => {
  const userTodos = todos.filter((todo) => todo.userId === req.user.id);
  res.json(userTodos);
});

// add a new todo for a user
app.post("/todos", authenticateUser, (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: todos.length + 1,
    userId: req.user.id,
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// update a todo for a user
app.put("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = todos.find(
    (t) => t.id === parseInt(id) && t.userId === req.user.id
  );
  if (todo) {
    // update todo properties if provided
    todo.title = title || todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// delete a todo
app.delete("/todos/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(
    (t) => t.id === parseInt(id) && t.userId === req.user.id
  );
  if (index !== -1) {
    todos.splice(index, 1); // remove todo from array
    res.json({ message: "Todo deleted successfully" });
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// start the server at port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

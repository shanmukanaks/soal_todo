import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";

// URL to connect to our backend
const API_URL = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null); // stores logged-in user info
  const [todos, setTodos] = useState([]); // stores user's todos
  const [newTodo, setNewTodo] = useState(""); // stores new todo input
  const [username, setUsername] = useState(""); // stores username input
  const [password, setPassword] = useState(""); // stores password input
  const [isRegistering, setIsRegistering] = useState(false); // toggle between login and register forms
  const [editingTodoId, setEditingTodoId] = useState(null); // for editing todo
  const [editingTodoTitle, setEditingTodoTitle] = useState(""); // to store edited todo

  // fetch todos when user logs in
  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  // fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`, {
        headers: { username: user.username, password: user.password },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // user login using backend end point
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      setUser({ username, password });
      alert(response.data.message);
    } catch (error) {
      alert("Login failed");
    }
  };

  // user registration using backend end point
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      alert(response.data.message);
      setIsRegistering(false); // switch back to login form after registering
    } catch (error) {
      alert("Registration failed");
    }
  };

  // add a new todo using backend end point
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") {
      alert("Please enter a non-empty todo item");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/todos`,
        { title: newTodo.trim() },
        {
          headers: { username: user.username, password: user.password },
        }
      );
      setTodos([...todos, response.data]);
      setNewTodo(""); // Clear input field after adding
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // toggle todo status using backend end point
  const handleToggleTodo = async (id, completed) => {
    try {
      const response = await axios.put(
        `${API_URL}/todos/${id}`,
        { completed: !completed },
        {
          headers: { username: user.username, password: user.password },
        }
      );
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // deleting a todo using backend end point
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`, {
        headers: { username: user.username, password: user.password },
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // handle editing of the todos
  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTodoTitle(todo.title);
  };

  const handleSaveEditTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_URL}/todos/${editingTodoId}`,
        { title: editingTodoTitle },
        {
          headers: { username: user.username, password: user.password },
        }
      );
      setTodos(
        todos.map((todo) => (todo.id === editingTodoId ? response.data : todo))
      );
      setEditingTodoId(null);
      setEditingTodoTitle("");
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // render login/register form if user is not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isRegistering ? "Register" : "Login"}
          </h1>
          <form
            onSubmit={isRegistering ? handleRegister : handleLogin}
            className="space-y-4"
          >
            {/* username input */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6de4]"
            />
            {/* password input */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8a6de4]"
            />
            {/* Login/Register button */}
            <button
              type="submit"
              className="w-full bg-[#7548db] text-white py-2 rounded-md hover:bg-[#8a6de4] transition duration-300"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>
          {/* toggle between login and register forms */}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full mt-4 text-[#7548db] hover:text-[#8a6de4] transition duration-300"
          >
            {isRegistering ? "Switch to Login" : "Switch to Register"}
          </button>
        </div>
      </div>
    );
  }

  // render todo list if user is logged in
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">To-Do List</h1>
        {/* form to add new todo */}
        <form onSubmit={handleAddTodo} className="mb-6 flex">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-md transition duration-300 ${
              newTodo.trim() === ""
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#7548db] text-white hover:bg-[#8a6de4]"
            }`}
            disabled={newTodo.trim() === ""}
          >
            Add Todo
          </button>
        </form>
        {/* list of todos */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center bg-gray-50 p-3 rounded-md"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id, todo.completed)}
                className="mr-3 form-checkbox h-5 w-5"
                style={{
                  accentColor: "#7548db",
                  borderColor: "#7548db",
                }}
              />
              {editingTodoId === todo.id ? (
                <form onSubmit={handleSaveEditTodo} className="flex-grow">
                  <input
                    type="text"
                    value={editingTodoTitle}
                    onChange={(e) => setEditingTodoTitle(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="ml-2 text-green-500 hover:text-green-600 transition duration-300"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <span
                  className={`flex-grow ${
                    todo.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.title}
                </span>
              )}
              {/* edit todo button */}
              <button
                onClick={() => handleEditTodo(todo)}
                className="ml-2 text-blue-500 hover:text-blue-600 transition duration-300"
              >
                <FaPencilAlt />
              </button>
              {/* delete todo button */}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-2 text-red-500 hover:text-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setUser(null)}
          className="mt-8 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.tasks || /^\s*$/.test(todo.tasks)) return;
    axios.post("http://localhost:3001/add-todo", {
      tasks: todo.tasks,
    });

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  useEffect(async () => {
    const result = await axios({
      url: `http://localhost:3001/all-todos`,
      method: "GET",
    });
    setTodos(result.data);
  }, []);

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) return;

    setTodos(
      (prev) => prev.map((item) => (item.id === todoId ? newValue : item)) //this should change the database.
    );
  };

  const removeTodo = async (id) => {
    const result = await axios({
      url: `http://localhost:3001/single-todo/${id}`,
      method: "DELETE",
    });
    setTodos(result.data);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Write down your plan for today</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;

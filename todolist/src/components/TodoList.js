import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import { Link } from "react-router-dom";

function TodoList({ pageNumber }) {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [modified, setModified] = useState(false);

  const addTodo = (todo) => {
    if (!todo.tasks || /^\s*$/.test(todo.tasks)) return;
    axios.post("http://localhost:3001/add-todo", {
      tasks: todo.tasks,
    });

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios
          .get(`http://localhost:3001/all-todos?page=${page}`)
          .then((response) => {
            const data = response.data.data;
            const pages = response.data.pages;
            setTodos(data);
            setPages(pages);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodos();
  }, [page, modified, todos]);

  const updateTodo = async (id, newValue) => {
    const result = await axios.put(`http://localhost:3001/todos/${id}`, {
      tasks: newValue.tasks,
    });
    setModified(!modified);
  };

  const removeTodo = async (id) => {
    console.log(id);
    const result = await axios({
      url: `http://localhost:3001/todos/${id}`,
      method: "DELETE",
    });
    setModified(!modified);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  if (!todos) {
    return <div></div>;
  } else {
    return (
      <div>
        <h1>Write down your plan for today</h1>
        <TodoForm onSubmit={addTodo} />
        <input
          className="searchBar"
          type="text"
          name="text"
          placeholder="Search"
        />
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />

        <div>
          <Link>
            <button
              onClick={() => setPage((page) => page - 1)}
              className="navButton"
              disabled={page === 1}
            >
              Previous
            </button>
          </Link>
          <Link>
            <button
              onClick={() => setPage((page) => page + 1)}
              className="navButton"
              disabled={page === pages}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default TodoList;

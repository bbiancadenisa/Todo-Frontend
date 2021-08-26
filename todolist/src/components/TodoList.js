import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList({ pageNumber }) {
  const [searchTerms, setSearchTerms] = useState("");
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [modified, setModified] = useState(false);
  const [searches, setSearches] = useState([]);

  const getSearches = async () => {
    try {
      const result = await axios
        .get(`http://localhost:3001/search/${searchTerms}`)
        .then((response) => {
          const data = response.data;
          setSearches(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [searchTerms, modified, todos]);

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

  useEffect(() => {
    fetchTodos();
  }, [page, modified]);

  const addTodo = (todo) => {
    if (!todo.tasks || /^\s*$/.test(todo.tasks)) return;
    axios
      .post("http://localhost:3001/add-todo", {
        tasks: todo.tasks,
      })
      .then((todos) => {
        fetchTodos();
      });
    setModified(!modified);
  };

  const removeTodo = async (id) => {
    const result = await axios.delete(`http://localhost:3001/todos/${id}`);
    setModified(!modified);
  };

  const updateTodo = async (id, newValue) => {
    const result = await axios.put(`http://localhost:3001/todos/${id}`, {
      tasks: newValue.tasks,
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

  const onChangeSearch = (e) => {
    setSearchTerms(e.target.value);
  };

  if (searchTerms) {
    return (
      <div>
        <div className="todolist">
          <h1>Search your todos here</h1>
          <input
            className="searchBar"
            type="text"
            name="text"
            placeholder="Search"
            value={searchTerms}
            onChange={onChangeSearch}
          />
          <Todo
            todos={searches}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </div>
        <div>
          <button
            onClick={() => setPage((page) => page - 1)}
            className="navButton"
            disabled={page === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setPage((page) => page + 1)}
            className="navButton2"
            disabled={page === pages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (!todos) {
    return <div></div>;
  } else {
    return (
      <div>
        <div className="todolist">
          <h1>Write down your plan for today</h1>

          <TodoForm onSubmit={addTodo} />
          <input
            className="searchBar"
            type="text"
            name="text"
            placeholder="Search"
            value={searchTerms}
            onChange={onChangeSearch}
          />
          <Todo
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </div>

        <div>
          <button
            onClick={() => setPage((page) => page - 1)}
            className="navButton"
            disabled={page === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setPage((page) => page + 1)}
            className="navButton2"
            disabled={page === pages}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default TodoList;

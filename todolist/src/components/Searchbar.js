import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import Todo from "./Todo";
import axios from "axios";

const useStyles = makeStyles({
  search: {},
});

function Searchbar({ searchTerms, onChangeSearch }) {
  const classes = useStyles;
  const inputRef = useRef(null);
  const [searches, setSearches] = useState([]);

  const completeSearch = (id) => {
    let updatedSearches = searches.map((searchTerms) => {
      if (searchTerms._id === id) {
        searchTerms.isComplete = !searchTerms.isComplete;
      }
      return searches;
    });
    setSearches(updatedSearches);
  };

  // const completeTodo = (id) => {
  //   let updatedTodos = todos.map((todo) => {
  //     if (todo._id === id) {
  //       todo.isComplete = !todo.isComplete;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const getSearches = async () => {
    try {
      const result = await axios
        .get(`http://localhost:3001/search/${searchTerms}`)
        .then((response) => {
          console.log(response);
          const data = response.data;
          setSearches(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searches);
  useEffect(() => {
    getSearches();
  }, [searchTerms]);

  if (searchTerms)
    return (
      <div className={classes.search}>
        <h1>Search your todos here</h1>
        <input
          className="searchBar"
          type="text"
          name="text"
          placeholder="Search"
          value={searchTerms}
          onChange={onChangeSearch}
          ref={inputRef}
        />

        {searches.map((searchItem, index) => (
          <div
            className={searchItem.isComplete ? "todo-row complete" : "todo-row"}
            key={searchItem._id}
            onClick={() => completeSearch(searchItem._id)}
          >
            {searchItem.tasks}
          </div>
        ))}
      </div>
    );
}

export default Searchbar;

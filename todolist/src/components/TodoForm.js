import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    marginBottom: "10px",
    padding: "14px 32px 14px 16px",
    borderRadius: "4px 0 0 4px",
    border: "2px solid #5d0cff",
    outline: "none",
    width: "375px",
    background: "transparent",
    color: "#fff",
    minHeight: "55px",
  },
});

function TodoForm(props) {
  const classes = useStyles();
  const inputRef = useRef(null);
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.onSubmit({
      tasks: input,
    });
    setInput("");
    const payload = {
      tasks: input,
    };
  };

  return (
    <div>
      <form className="todoForm" onSubmit={handleSubmit}>
        {props.edit ? (
          <>
            <input
              placeholder="Update your task"
              type="text"
              value={input}
              name="text"
              className={classes.input}
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todoButton edit">Update</button>
          </>
        ) : (
          <>
            <input
              placeholder="Add a To-Do"
              type="text"
              value={input}
              name="text"
              className={classes.input}
              onChange={handleChange}
              ref={inputRef}
            />
            <button className="todoButton">Add To-Do</button>
          </>
        )}
      </form>
    </div>
  );
}

export default TodoForm;

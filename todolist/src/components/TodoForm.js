import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

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
              className="inputForm"
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
              className="inputForm"
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

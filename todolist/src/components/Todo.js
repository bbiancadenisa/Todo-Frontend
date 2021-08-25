import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    _id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    console.log(edit);
    updateTodo(edit._id, value);
    setEdit({
      _id: null,
      value: "",
    });
  };

  if (edit._id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  } else {
    if (Array.isArray(todos)) {
      return todos.map((todo, index) => (
        <div
          className={todo.isComplete ? "todo-row complete" : "todo-row"}
          key={index}
        >
          <div key={todo._id} onClick={() => completeTodo(todo._id)}>
            {todo.tasks}
          </div>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo._id)}
              className="delete-icon"
            />
            <TiEdit
              onClick={() => setEdit({ _id: todo._id, value: todo.tasks })}
              className="edit-icon"
            />
          </div>
        </div>
      ));
    } else {
      return <div></div>;
    }
  }
}

export default Todo;

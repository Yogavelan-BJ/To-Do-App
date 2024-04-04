import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoItem({ todo }) {
  const { toggleComplete, deleteTodo, updateTodo } = useTodo();
  const [todomsg, setTodomsg] = useState(todo.todo);
  const [editable, setEditable] = useState(!todo.completed);
  const [editing, setEditing] = useState(false);

  const toggle = () => {
    toggleComplete(todo.id);
    setEditable((prev) => !prev);
  };

  const save = () => {
    setEditing((prev) => !prev);
    updateTodo(todo.id, { ...todo, todo: todomsg });
  };
  return (
    <div className=" w-full h-full flex items-center justify-center gap-2 p-2">
      <input
        className=" size-8"
        type="checkbox"
        checked={todo.completed}
        onChange={toggle}
      />
      <input
        type="text"
        className="rounded-sm font-semibold text-xs border-0 h-8 w-8/12 focus:outline-4 outline-green-400"
        value={todomsg}
        onChange={(e) => setTodomsg(e.target.value)}
        readOnly={!editing}
      />
      {!editing ? (
        <button
          className="  bg-cyan-800 rounded-sm font-semibold text-xs h-8 w-1/12"
          disabled={!editable}
          onClick={() => setEditing((prev) => !prev)}
        >
          ✏️
        </button>
      ) : (
        <button
          className="h-8 w-1/12 bg-cyan-800 rounded-sm font-semibold text-xs"
          onClick={save}
        >
          📁
        </button>
      )}
      <button
        className="h-8 w-1/12 bg-cyan-800 rounded-sm font-semibold text-xs"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;

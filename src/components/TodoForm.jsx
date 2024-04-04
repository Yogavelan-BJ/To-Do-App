import React from "react";
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const submit = (e) => {
    e.preventDefault();
    if (!todo) return;
    const obj = { id: Date.now(), todo: todo, completed: false };
    addTodo(obj);
    setTodo("");
  };

  return (
    <div className="bg-slate-800 flex rounded-lg justify-center items-center m-2 p-2 w-2/3 h-28">
      <form onSubmit={submit} className="flex gap-1 w-full">
        <input
          type="text"
          className="rounded-sm font-semibold text-xs border-0 h-8 w-11/12 focus:outline-4 outline-green-400"
          placeholder="Enter Your Todo here"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <button
          className=" bg-cyan-600 rounded-sm font-semibold text-xs w-1/12"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default TodoForm;

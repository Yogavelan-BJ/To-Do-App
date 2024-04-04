import { TodoProvider, useTodo } from "./contexts/TodoContext";
import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import giphy from "./assets/giphy.gif";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((td) => (td.id === id ? todo : td)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((td) => td.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((td) =>
        td.id === id ? { ...td, completed: !td.completed } : td
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, toggleComplete, addTodo, deleteTodo, updateTodo }}
    >
      <div className=" w-full h-full flex flex-col items-center ">
        <h1 className=" text-5xl text-slate-800 font-serif m-3">TODO APP</h1>
        <TodoForm />
        {todos.length < 1 && (
          <div className="flex justify-center items-center flex-col">
            <h1 className=" text-3xl font-bold text-secondary-color">
              YOU DONT HAVE ANYTHING TO DO!!
            </h1>
            <img
              alt="have fun gif"
              className=" rounded-3xl size-80"
              src={giphy}
            />
          </div>
        )}
        {todos.map((todo) => (
          <div
            className=" bg-slate-500 flex rounded-lg justify-center items-center m-2 w-2/3 h-16"
            key={todo.id}
          >
            <TodoItem todo={todo} />
          </div>
        ))}
      </div>
    </TodoProvider>
  );
}

export default App;

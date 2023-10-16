import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/todocontext";

export const TodoCard = ({ key, id, title, subtitle, completed }) => {
  const { todos, editTodos } = useContext(TodoContext);

  const [todosVal, setTodosVal] = todos;
  const [editTodosVal, setEditTodosVal] = editTodos;

  const completeTodo = (e) => {
    const filterTodo = todosVal.map((item) => {
      if (item.id === e.target.value) {
        item.completed = false;
        if (e.target.checked) {
          item.completed = true;
        }
      }
      return item;
    });
    setTodosVal(filterTodo);
    // console.log("filter Todo =>" , filterTodo)
  };

  const deleteTodo = (e) => {
    const filteredTodo = todosVal.filter((item) => {
      return item.id !== e.target.id;
    });
    setTodosVal(filteredTodo);
  };

  const editTodo = (e) => {
    // console.log("ini event=>", e);
    const filterTodo = todosVal.map((item) => {
      // console.log("ini item=>", item);
      if (item.id === e.target.id) {
        // set item to editTodos at context, so the other component can use the editTodos context
        setEditTodosVal(item);
      }
      return item;
    });
    setTodosVal(filterTodo);
  };

  useEffect(() => {
    console.log("editTodos? ==>", editTodosVal);
  }, [editTodosVal]);

  const isCompleted = completed ? "checked" : "";

  return (
    <>
      <div className="flex w-full bg-black bg-opacity-40 p-1 pl-2 justify-between rounded-t-lg">
        <div className="flex space-x-2">
          <input
            className="my-auto"
            type="checkbox"
            id={id}
            checked={isCompleted}
            value={id}
            onChange={(e) => completeTodo(e)}
          ></input>
          <label className="">{title}</label>
        </div>
        <div className="flex space-x-1">
          <button
            className="flex items-center justify-center h-full border-2 border-white px-1 rounded-md bg-red-600 text-xs"
            id={id}
            onClick={(e) => editTodo(e)}
          >
            Edit
          </button>
          <button
            className="flex items-center justify-center h-full border-2 border-white px-1 rounded-md bg-red-600 text-xs"
            id={id}
            onClick={(e) => deleteTodo(e)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="p-1 bg-white bg-opacity-20 rounded-b-md">{subtitle}</div>
    </>
  );
};

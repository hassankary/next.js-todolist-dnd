"use client";
import { useState } from "react";

const Todo = () => {
  const [activity, setActivity] = useState("");
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("");

  const generateId = () => {
    return Date.now();
  };
  const addTodoHandler = (event) => {
    event.preventDefault();

    if (!activity) {
      return setMessage("Nama aktifitas jangan kosong");
    }

    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        id: edit.id,
        activity,
        done: edit.done,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id === edit.id;
      });

      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      console.log(updatedTodos);
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity: activity,
        done: false,
      },
    ]);
    setActivity("");
  };

  const doneTodoHandler = (todo) => {
    const updatedTodo = {
      // bisa ditulis dengan spread operator ""...todo" sama dengan merge object
      id: todo.id,
      activity: todo.activity,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id === todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  };

  const removeTodoHandler = (todoId) => {
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    // console.log("ini filteredTodos ==>", filteredTodos);
    setTodos(filteredTodos);
    if (edit.id) cancelEditHandler();
  };

  const editTodoHandler = (todo) => {
    setEdit(todo);
    setActivity(todo.activity);
  };

  const cancelEditHandler = () => {
    console.log("cancel edit");
    setEdit({});
    setActivity("");
  };

  return (
    <div className="text-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center">
      <div className="my-10 text-center px-8 py-4 w-1/2 border-2 border-white rounded-xl">
        <h1 className="font-bold text-2xl">Todo List</h1>
        {message && <div style={{ color: "red" }}>{message}</div>}
        <form onSubmit={addTodoHandler} className="my-4">
          <input
            type="text"
            placeholder="Add your new todo"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
          />
          <button type="submit">{edit.id ? "Update" : "Add"}</button>
          {edit.id && (
            <button type="submit" onClick={cancelEditHandler}>
              Cancel
            </button>
          )}
        </form>
        <ul>
          {todos.map((todo) => {
            return (
              <div className=" bg-white py-auto mb-1 bg-opacity-30 px-2 py-1">
                <li className="flex justify-between" key={todo.id}>
                  <div className="flex space-x-1">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={doneTodoHandler.bind(this, todo)}
                    />
                    <label>
                      {todo.activity} ({todo.done ? "selesai" : "belum selesai"})
                    </label>
                  </div>
                  <div className="space-x-1"> 
                    <button onClick={() => editTodoHandler(todo)}>Edit</button>
                    <button onClick={removeTodoHandler.bind(this, todo.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todo;

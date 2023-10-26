import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [todos, setTodos] = useState([]);
  const [editTodos, setEditTodos] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const getTodos = JSON.parse(localStorage?.getItem("todos"));

  useEffect(() => {
    setTodos(getTodos);
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos: [todos, setTodos],
        editTodos: [editTodos, setEditTodos],
        notFound: [notFound, setNotFound],
        searchResult: [searchResult, setSearchResult],
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

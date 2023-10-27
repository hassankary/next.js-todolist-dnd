import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [todos, setTodos] = useState([]);
  const [editTodos, setEditTodos] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (window) {
      const getTodos = JSON.parse(window.localStorage?.getItem("todos"));
      setTodos(getTodos);
      setIsInitialFetching(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialFetching) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

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

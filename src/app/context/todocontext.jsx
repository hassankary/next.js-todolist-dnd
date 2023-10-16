import { getImgProps } from "next/dist/shared/lib/get-img-props";
import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const getTodos = JSON.parse(localStorage?.getItem("todos"));
  const [todos, setTodos] = useState(getTodos ? getTodos : []);
  const [editTodos, setEditTodos] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  

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

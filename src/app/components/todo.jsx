import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/todocontext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TodoForm } from "./todoForm";
import { TodoList } from "./todolist";

export const Todo = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { todos, notFound, searchResult } = useContext(TodoContext);

  const [notFoundVal, setNotFoundVal] = notFound;
  const [todosVal, setTodosVal] = todos;
  const [searchResultVal, setSearchResultVal] = searchResult;

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedTodos = [...todosVal];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removeTodo] = reorderedTodos.splice(sourceIndex, 1);
      reorderedTodos.splice(destinationIndex, 0, removeTodo);

      return setTodosVal(reorderedTodos);
    }
  };

  const searchTodo = (e) => {
    // if(e) {
    //   e.preventDefault()
    // }
    e?.preventDefault();

    if (!searchTitle) {
      setNotFoundVal(false);
      return setSearchResultVal([]);
    }
    const filterTodo = todosVal.filter((todo) => {
      // return todo.title === searchTitle;
      return todo.title.includes(searchTitle);
    });

    if (!filterTodo.length && searchTitle) {
      setNotFoundVal(true);
    } else {
      setNotFoundVal(false);
    }
    
    setSearchResultVal(filterTodo);
  };

  useEffect(() => {
    searchTodo();
  }, [todosVal]);

  return (
    <>
      <div className="flex pb-4">
        <form className="flex items-center justify-end w-full">
          <div className="flex px-2 space-x-2 w-full">
            <input
              className="text-black rounded-md px-2 w-full"
              type="search"
              placeholder="Search..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button
              
              onClick={searchTodo}
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <h1 className="text-3xl font-bold py-6">Todo Application</h1>

      <TodoForm />
      {notFoundVal ? <p>Not Found...</p> : <></>}
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              className="flex flex-col items-start min-h-[500px]"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TodoList />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

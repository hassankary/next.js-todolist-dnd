import { useContext, useEffect } from "react";
import { TodoCard } from "./todoCard";
import { TodoContext } from "../context/todocontext";
import { Draggable } from "react-beautiful-dnd";

export const TodoList = () => {
  const { todos, searchResult } = useContext(TodoContext);

  const [todosVal, setTodosVal] = todos;
  const [searchResultVal, setSearchResultVal] = searchResult;


  if (searchResultVal.length) {
    return searchResultVal.map((item, index) => (
      <Draggable draggableId={item.id} key={item.id} index={index}>
        {(provided) => (
          <div
            className="p-1 w-full"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <TodoCard
              key={item.id}
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              completed={item.completed}
            />
          </div>
        )}
      </Draggable>
    ));
  }

  return todosVal?.length ? (
    todosVal?.map((item, index) => {
      return (
        <Draggable draggableId={item.id} key={item.id} index={index}>
          {(provided) => (
            <div
              className="p-2 w-full"
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <TodoCard
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                completed={item.completed}
              />
            </div>
          )}
        </Draggable>
      );
    })
  ) : (
    <h1>Item not found. Please add some...</h1>
  );
};

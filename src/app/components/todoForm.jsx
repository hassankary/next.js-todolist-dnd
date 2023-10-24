import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/todocontext";
import { v4 as uuidv4 } from "uuid";

export const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [createTodo, setCreateTodo] = useState(false);

  const { todos, editTodos, notFound } = useContext(TodoContext);

  const [todosVal, setTodos] = todos;
  const [editTodosVal, setEditTodos] = editTodos;
  const [notFoundVal, setNotFound] = notFound;

  const addTodo = (e) => {
    e.preventDefault();
    if (!title || !subtitle) {
      alert("Field can not be blank");
      return;
    }

    const newTodos = [
      ...todosVal,
      { id: uuidv4(), title: title, subtitle: subtitle, completed: false },
    ];

    setTodos(newTodos);
    // setSubTodosVal(newSubtodos);
    setTitle("");
    setSubtitle("");
    setNotFound(false);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todosVal));
  }, [todosVal]);

  useEffect(() => {
    // checking for every changes on editTodos.
    // if there are any changes on editTodos, and editTodos.title is exist, just update the title to be editTodos.title
    if (editTodosVal?.title) {
      setTitleModal(editTodosVal.title);
    }
  }, [editTodosVal]);

  const editTodo = (e) => {
    e.preventDefault();

    // =================== Cara Pakai Id ====================
    const filterTodo = todosVal.map((item) => {
      if (editTodosVal.id === item.id) {
        return { ...item, title: titleModal };
      }
      return item;
    });
    setTodos(filterTodo);

    // // ===================== Cara Pakai Index =======================
    // const tempTodos = [...todos];
    // const indexEdit = todos.findIndex((todo) => todo.id === editTodos.id);

    // if (indexEdit > -1) {
    //   tempTodos[indexEdit] = {
    //     ...tempTodos[indexEdit],
    //     title: titleModal,
    //   };
    // }
    // setTodos(tempTodos);

    setTitleModal("");
    setEditTodos(null);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setTitleModal("");
    setEditTodos(null);
  };

  const todoModal = (e) => {
    e.preventDefault();
    setCreateTodo(!createTodo);
  };

  return (
    <div className="py-4">
      <button
        className={` ${
          createTodo ? "bg-red-500 hover:bg-red-400" : "hover:bg-[#090909] "
        } font-bold px-4 py-2 bg-black  rounded-md mb-4`}
        onClick={todoModal}
      >
        {createTodo ? "Cancel" : "Create Todo"}
      </button>
      {createTodo ? (
        <form className="flex flex-col justify-center items-center px-2 mb-6">
          <input
            type="text"
            placeholder="Title..."
            className="w-full bg-white text-black rounded-md px-1 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <textarea
            type="text"
            placeholder="Description..."
            className="mt-4 w-full bg-white text-black rounded-md px-1 "
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-6 w-[20%] font-bold bg-black hover:bg-[#090909] py-2 rounded-lg text-md"
            onClick={addTodo}
          >
            Submit
          </button>
        </form>
      ) : (
        ""
      )}
      {!!editTodosVal ? (
        <div className=" fixed flex w-full inset-0 justify-center items-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="flex flex-col justify-center bg-white p-1 w-[40%] rounded-xl">
            <div className="flex justify-end">
              <button className=" w-[25px] text-black" onClick={cancelEdit}>
                x
              </button>
            </div>
            <div className="flex flex-col w-full p-6 pt-0 text-black">
              <h1 className="font-bold mb-6 text-xl">Edit?</h1>
              <form className="flex flex-col">
                <input
                  className="py-[3px] px-2 w-full border border-black rounded-md"
                  type="text"
                  value={titleModal}
                  onChange={(e) => setTitleModal(e.target.value)}
                />
                <div className="space-x-1 pt-6">
                  <button
                    className="py-1 px-2 bg-green-500 hover:bg-green-400 transition font-bold text-white rounded-lg w-[80px] justify-center"
                    onClick={editTodo}
                  >
                    Update
                  </button>
                  <button
                    className="py-1 px-2 bg-red-500 hover:bg-red-400 transition font-bold text-white rounded-lg w-[80px] justify-center"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

{
  /* {!!editTodos ? (
          <>
            <button
              type="submit"
              className="border-2 border-white px-1 text-md"
              // onClick={editTodo}
            >
              Update
            </button>
            <button
              type="submit"
              className="border-2 border-white border-l-0 px-1 rounded-r-md text-md"
              // onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="border-2 border-white px-1 rounded-r-md text-md"
            onClick={addTodo}
          >
            Add
          </button>
        )} */
}

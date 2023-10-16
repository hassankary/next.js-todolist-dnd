"use client";
import { TodoProvider } from "./context/todocontext";
import { Todo } from "./components/todo";

export default function Home() {
  return (
    <TodoProvider>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full text-white flex flex-col justify-center items-center min-h-screen">
        <div className=" my-10 text-center px-8 py-4 w-1/2 border-2 shadow-2xl border-white rounded-xl">
          <Todo />
        </div>
      </div>
    </TodoProvider>
  );
}

"use client";
import { TodoProvider } from "./context/todocontext";
import { Todo } from "./components/todo";

export default function Home() {
  return (
    <TodoProvider>
      <div className=" bg-black px-0 md:px-[10%] lg:px-[20%] text-white flex flex-col justify-center items-center min-h-screen">
        <div className=" my-10 bg-[#101010] text-center px-8 py-4 w-full shadow-2xl rounded-xl">
          <Todo />
        </div>
      </div>
    </TodoProvider>
  );
}

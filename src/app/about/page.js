"use client";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DATA = [
  { id: "0e2f0db1-5457-46b0-949e-8032d2f9997a", name: "Hassan" },
  { id: "487f68b4-1746-438c-920e-d67b7df46247", name: "Abri" },
  { id: "25daffdc-aae0-4d73-bd31-43f73101e7c0", name: "Dazzal" },
];

export default function About() {
  const [data, setData] = useState(DATA);

  const handleDragDrop = (results) => {
    // console.log("This is handle drag", results)
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedData = [...data];
      ["Hassan", "Abri", "Dazzal"]
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removeData] = reorderedData.splice(sourceIndex, 1); 
      console.log("removedata ==>", removeData);
      reorderedData.splice(destinationIndex, 0, removeData); 
    //   console.log("reordered data ==>", reorderedData)

      return setData(reorderedData);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex flex-col justify-center items-center">
        <div className=" my-10 text-center px-8 py-4 w-[350px] border-2 border-white rounded-xl">
          <DragDropContext onDragEnd={handleDragDrop}>
            <h1 className="text-3xl font-bold mb-4">Todo Application</h1>
            <div>Add Todo</div>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {data.map((list, index) => (
                    <Draggable
                      draggableId={list.id}
                      key={list.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="bg-black "
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <h3>{list.name}</h3>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
}

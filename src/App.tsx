import React from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-touch-backend";
import { useDrag, useDrop } from "react-dnd";

const App: React.FC = () => {
  return (
    <DndProvider backend={Backend}>
      <Draggable/>
      <Droppable/>
    </DndProvider>
  );
};

const Draggable: React.FunctionComponent = () => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "CARD" },
    end: console.log,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={dragRef} style={{ opacity }}>
      text dayo.
    </div>
  );
};

const Droppable: React.FunctionComponent = () => {
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "CARD",
    drop: console.log,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  return (
    <div ref={dropRef} style={{ width: 300, height: 300, margin: 10, border: "solid 1px" }}>
      {isOver && "OVER"}
      {canDrop && "DROP HERE!!!!!!!!"}
    </div>
  );
};

export default App;

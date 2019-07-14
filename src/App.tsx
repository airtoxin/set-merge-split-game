import React from "react";
import "./App.css";
import { DndProvider, useDragLayer } from "react-dnd";
import Backend from "react-dnd-touch-backend";
import { useDrag, useDrop } from "react-dnd";

const App: React.FC = () => {
  return (
    <div className="App">
      <DndProvider backend={Backend}>
        <DragLayer />
        <Draggable name={"dayo"} />
        <Draggable name={"dayo2"} />
        <Droppable />
      </DndProvider>
    </div>
  );
};

const DragLayer: React.FunctionComponent = () => {
  const { item, offset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    offset: monitor.getSourceClientOffset()
  }));

  if (!item || !offset) return null;

  return (
    <div
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`
      }}
    >
      text {item.id}
    </div>
  );
};

const Draggable: React.FunctionComponent<{ name: string }> = ({ name }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: "CARD", id: name },
    end: console.log,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <div ref={dragRef} style={{ opacity }}>
      text {name}
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
    <div
      ref={dropRef}
      style={{ width: 300, height: 300, margin: 10, border: "solid 1px" }}
    >
      {isOver && "OVER"}
      {canDrop && "DROP HERE!!!!!!!!"}
    </div>
  );
};

export default App;

import { EventBus } from "../EventBus";
import { useRef } from "react";

export default function ArrowControls(){
    const holdRef = useRef(null);

  const handleDown = (dir) => {
    EventBus.emit("move", dir);
    holdRef.current = setInterval(() => {
      EventBus.emit("move", dir);
    }, 100); // continuous movement while holding
  };

  const handleUp = () => {
    clearInterval(holdRef.current);
    EventBus.emit("stop");
  };

  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 md:hidden">
      <button
        className="bg-gray-200 px-4 py-2 rounded"
        onMouseDown={() => handleDown("up")}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
      >↑</button>

      <div className="flex gap-2">
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onMouseDown={() => handleDown("left")}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        >←</button>
        <button
          className="bg-gray-200 px-4 py-2 rounded"
          onMouseDown={() => handleDown("right")}
          onMouseUp={handleUp}
          onMouseLeave={handleUp}
        >→</button>
      </div>

      <button
        className="bg-gray-200 px-4 py-2 rounded"
        onMouseDown={() => handleDown("down")}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
      >↓</button>
    </div>
  );
}
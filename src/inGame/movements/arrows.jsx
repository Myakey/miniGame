import { EventBus } from "../EventBus";
import { useRef } from "react";

export default function ArrowControls() {
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

  const handleTap = (dir) => {
    EventBus.emit("move", dir);
    setTimeout(() => EventBus.emit("stop"), 100); // brief movement
  };

  const commonProps = (dir) => ({
    onMouseDown: () => handleDown(dir),
    onMouseUp: handleUp,
    onMouseLeave: handleUp,
    onClick: () => handleTap(dir),
    onTouchStart: () => handleDown(dir),
    onTouchEnd: handleUp,
    onTouchCancel: handleUp,
  });

  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2 md:hidden">
      <button className="bg-gray-200 px-4 py-2 rounded" {...commonProps("up")}>
        ↑
      </button>

      <div className="flex gap-2">
        <button className="bg-gray-200 px-4 py-2 rounded" {...commonProps("left")}>
          ←
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded" {...commonProps("right")}>
          →
        </button>
      </div>

      <button className="bg-gray-200 px-4 py-2 rounded" {...commonProps("down")}>
        ↓
      </button>
    </div>
  );
}
 
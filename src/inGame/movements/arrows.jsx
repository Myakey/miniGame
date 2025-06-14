import { EventBus } from "../EventBus";
import { useRef } from "react";
import { arrow } from "../../assets/assetsPreLoad"; // up‑facing arrow

export default function ArrowControls() {
  const holdRef = useRef(null);

  /* ───────────────── handlers ───────────────── */
  const handleDown = (dir) => {
    EventBus.emit("move", dir);
    holdRef.current = setInterval(() => EventBus.emit("move", dir), 100);
  };

  const handleUp = () => {
    clearInterval(holdRef.current);
    EventBus.emit("stop");
  };

  const handleTap = (dir) => {
    EventBus.emit("move", dir);
    setTimeout(() => EventBus.emit("stop"), 100);
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

  /* background image style reused by every button */
  const arrowStyle = {
    backgroundImage: `url(${arrow})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  };

  /* helper for building each arrow button */
  const ArrowBtn = ({ dir, rotate }) => (
    <button
      {...commonProps(dir)}
      className={`w-12 h-12 rounded focus:outline-none transform ${rotate}`}
      style={arrowStyle}
    />
  );

  return (
    <div className="bottom-4 left-4 flex flex-col gap-2 m-5 md:hidden items-center">
      <ArrowBtn dir="up"    rotate="rotate-0"   />

      <div className="flex gap-5">
        <ArrowBtn dir="left"  rotate="-rotate-90" />
        <ArrowBtn dir="down"  rotate="rotate-180" />
        <ArrowBtn dir="right" rotate="rotate-90"  />
      </div>

      
    </div>
  );
}


 
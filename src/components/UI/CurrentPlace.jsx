import { currentPlace } from "../../assets/assetsPreLoad";
import { GameStatusProvider, useGameContext } from "../../context/GameStatusContext";
import { useEffect, useState } from "react";

export default function ShowCurrentPlace() {
  const { status } = useGameContext();
  const [displayText, setDisplayText] = useState(status.currentPlace);
  const [fadeClass, setFadeClass] = useState("opacity-100");

  useEffect(() => {
    if (status.currentPlace !== displayText) {
      setFadeClass("opacity-0"); // Start fade-out

      const timeout = setTimeout(() => {
        setDisplayText(status.currentPlace); // Change text after fade-out
        setFadeClass("opacity-100"); // Fade back in
      }, 300); // match transition duration

      return () => clearTimeout(timeout);
    }
  }, [status.currentPlace, displayText]);

  return (
    <div
      className={`hidden md:flex md:items-center md:justify-center md:fixed md:top-4 md:right-4 z-10 p-5 gap-4 transition-opacity duration-300 ease-in-out text-black ${fadeClass}`}
      style={{
        width: "200px", // fixed width
        height: "64px", // fixed height
        backgroundImage: `url(${currentPlace})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        fontWeight: "bold",
        fontSize: "1.25rem",
        textAlign: "center",
      }}
    >
      {displayText}
    </div>
  );
}


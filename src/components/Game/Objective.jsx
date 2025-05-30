import React, { useState, useEffect, useRef } from "react";
import { EventBus } from "../../inGame/EventBus";

function ObjectivePanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const hideTimeoutRef = useRef(null);
  const [objectiveText, setObjectiveText] = useState("Complete the main quest to save the world!");

  useEffect(() => {
    const handleCallObjective = (text) => {
      setObjectiveText(text);
      setShouldRender(true);     // Mount immediately
      setIsVisible(true);        // Start slide-in

      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);     // Trigger slide-out
      }, 5000);
    };

    EventBus.on("callObjective", handleCallObjective);

    // Cleanup
    return () => {
      EventBus.off("callObjective", handleCallObjective);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Handle delayed unmount after hide animation
  useEffect(() => {
    if (!isVisible) {
      const timeout = setTimeout(() => setShouldRender(false), 300); // Duration matches CSS animation
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  const toggleVisibility = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setShouldRender(true); // Make sure it's mounted first
      setIsVisible(true);
    }
  };

  return (
    <>
      {shouldRender && (
        <div
          className="fixed top-1/3 right-0 z-40 w-64 bg-white shadow-xl border-l border-gray-300 p-4 rounded-l-xl transition-transform duration-300 ease-in-out"
          style={{
            transform: isVisible ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <h2 className="text-lg font-bold mb-2 text-gray-800">Current Objective</h2>
          <p className="text-sm text-gray-600">{objectiveText}</p>
        </div>
      )}

      <button
        onClick={toggleVisibility}
        className="fixed top-1/3 right-0 z-50 flex justify-center items-center w-10 h-10 bg-yellow-400 hover:bg-yellow-500 rounded-l-xl shadow-lg transition-transform duration-300 ease-in-out"
        aria-label={isVisible ? "Hide Objective" : "Show Objective"}
        style={{
          transform: isVisible ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </>
  );
}

export default ObjectivePanel;





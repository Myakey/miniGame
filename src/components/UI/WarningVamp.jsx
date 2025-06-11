import { useEffect } from "react";

export default function VampireWarning({ visible, onClose }) {
  useEffect(() => {
    if (visible) {
        
      const timer = setTimeout(() => {
        console.log("HI");
        onClose(); // Closes after 4s
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  useEffect(() => {
  console.log("Popup visible:", visible);
}, [visible]);

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-red-100 border border-red-500 text-red-900 px-6 py-3 rounded-xl shadow-md">
        <p className="font-semibold">🌞 You're outside during the day!</p>
        <p className="text-sm">Your stats are dropping fast — get inside!</p>
      </div>
    </div>
  );
}

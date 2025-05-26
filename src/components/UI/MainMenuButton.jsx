import React from "react";

const MainMenuButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-60 py-3 px-6 text-xl font-bold text-white bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-800 transition-all duration-200 ease-in-out rounded-2xl shadow-lg hover:shadow-2xl active:scale-95 focus:outline-none"
    >
      {label}
    </button>
  );
};

export default MainMenuButton;
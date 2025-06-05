import { useEffect } from "react";

export default function debugBox({ innerText, modal, toggleModal, toggleModalFalse }) {
    
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            toggleModalFalse();
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
    
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);


  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-[1.01]">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold hover:cursor-pointer"
            >
              &times;
            </button>
            <div className="flex flex-col text-center">
                Warning! If you click on one of the places, your browser will stuck in the area until a new page is created or Click the reset Button!
                <div className="flex flex-row">
                    {innerText}
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
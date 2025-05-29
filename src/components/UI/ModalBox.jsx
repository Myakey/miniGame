// import React, { useState } from 'react';

// function Modal(innerText){
//     const [modal, setModal] = useState(false);

//     const toggleModal = () =>{
//         setModal(!modal);
//     }

//     return(
//         <>  
//             <button className="min-w-[4rem] w-full sm:w-24 h-12 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white text-5x1 font-semibold rounded flex items-center justify-center text-center px-1 m-5" id="button3" onClick={toggleModal}>{innerText.button}</button> 
//             {modal && (
//               <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//                 <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-[1.01]">
//                   <button
//                     onClick={toggleModal}
//                     className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold hover:cursor-pointer"
//                   >
//                     &times;
//                   </button>
//                   {innerText.text}
//                 </div>
//               </div>
//             )}
//         </>   
//     )
// }

// export default Modal;
// src/components/Modal.jsx (or your preferred path)
// src/components/Modal.jsx (ensure this is your current version)
import React from 'react';

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-[1.01]"
        onClick={handleModalContentClick}
      >
        <button
          onClick={onClose} // The 'x' button will act as a "No" or "Cancel"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold hover:cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children} {/* Description and Yes/No buttons will go here */}
      </div>
    </div>
  );
}

export default Modal;
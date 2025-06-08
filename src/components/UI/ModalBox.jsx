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
import React, { useEffect, useState } from 'react';
import { GUITry } from '../../assets/assetsPreLoad';

function Modal({ isOpen, onClose, title, children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Mount when isOpen becomes true
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimatingOut(false);
    } else if (isVisible) {
      // Trigger closing animation before unmount
      setIsAnimatingOut(true);
      const timeout = setTimeout(() => {
        setIsVisible(false);
        setIsAnimatingOut(false);
      }, 400); // must match tvOff duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleBackdropClick = () => {
    if (onClose) onClose();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative rounded-xl shadow-xl p-6 w-full h-120 max-w-md transform ${
          isAnimatingOut ? 'tv-off' : 'tv-on'
        }`}
        onClick={handleModalContentClick}
        style={{
          backgroundImage: `url(${GUITry})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          imageRendering: 'pixelated',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-white hover:text-yellow-200 text-2xl font-bold hover:cursor-pointer"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Content with optional black overlay behind children only */}
        <div className="relative z-10 flex flex-col justify-center items-center">
          <div className="absolute rounded-xl z-0" />
          <div className="relative z-10 text-white drop-shadow flex flex-col justify-center items-center">
            {title && <h2 className="text-3xl mb-4 mt-4">{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

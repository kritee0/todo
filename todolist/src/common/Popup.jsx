import React from "react";

const Popup = ({ children, onClose }) => {
  return (
    <>
   
      <div
        className=" fixed inset-0 bg-opacity-30 z-40"
        onClick={onClose}
      />

    
      <div className="   fixed  inset-0 z-50 flex items-center justify-center">
        <div
          className=" max-w-2xl  relative w-full  bg-white  p-6 rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Popup;


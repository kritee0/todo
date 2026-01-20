import React from "react";

const Popup = ({ children, onClose }) => {
  return (
    <>
   
      <div
        className=" fixed  inset-0 bg-white/30 backdrop-blur-sm z-40 " 
        onClick={onClose}
      />

    
      <div className="   fixed  inset-0 z-80 flex items-center justify-center ">
        <div
          className=" max-w-4xl  relative w-full h-full  bg-white  p-6 rounded-lg shadow-2xl overflow-y-auto  overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Popup;


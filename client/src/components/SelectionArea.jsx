import React from "react";

function SelectionArea({ radioInput }) {
   return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center border-2 border-amber-950 rounded-xl p-4">
         <h1 className="text-3xl ">Selection Area</h1>
         <span>{radioInput}</span>
      </div>
   );
}

export default SelectionArea;

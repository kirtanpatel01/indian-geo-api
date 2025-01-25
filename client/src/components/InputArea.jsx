import React, { useState } from "react";

function InputArea({ setRadioInput, radioInput }) {
   const inputTypes = ["state", "district", "taluka", "village"];
   const [selectedInput, setSelectedInput] = useState(null);

   return (
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center gap-16 border-2 border-primary-950 rounded-xl p-16">
         <label className="text-3xl">Select what you want to enter:</label>

         <select
            name="input"
            value={selectedInput || ""}
            onChange={(e) => setSelectedInput(e.target.value)}
            className="px-4 py-2 rounded-md border border-primary-950 bg-primary-700 bg-opacity-10"
         >
            <option value="" className="hover:bg-amber-200">
               --Select one--
            </option>
            {inputTypes.map((inputItem) => (
               <option key={inputItem} value={inputItem}>
                  {inputItem.charAt(0).toUpperCase() + inputItem.slice(1)}
               </option>
            ))}
         </select>

         <ul className="flex flex-col gap-8">
            {inputTypes.map((inputItem, index) => (
               <li className="flex gap-4" key={index}>
                  <button
                     onClick={() => setRadioInput(inputItem)} // Set the selected input type
                     disabled={
                        selectedInput === null ||
                        index > inputTypes.indexOf(selectedInput)
                     }
                     className={`px-4 py-2 rounded-md border-2 ${
                        radioInput === inputItem
                           ? "bg-primary-700 text-white"
                           : "bg-primary-50/50 text-black"
                     } ${
                        selectedInput !== null &&
                        index <= inputTypes.indexOf(selectedInput)
                           ? "cursor-pointer hover:bg-primary-700 hover:text-white"
                           : "cursor-not-allowed opacity-50"
                     }`}
                  >
                     Show
                  </button>
                  <input
                     type="text"
                     name={inputItem}
                     placeholder={
                        inputItem.charAt(0).toUpperCase() + inputItem.slice(1)
                     }
                     disabled={
                        selectedInput === null ||
                        index > inputTypes.indexOf(selectedInput)
                     }
                     className={`px-4 py-2 border border-primary-500 outline-none bg-amber-300/10 rounded-md
                ${
                   selectedInput !== null &&
                   index <= inputTypes.indexOf(selectedInput)
                      ? "bg-primary-600/50"
                      : "bg-primary-300/10 cursor-not-allowed "
                }`}
                  />
               </li>
            ))}
         </ul>

         <button className="px-4 py-2 rounded-md border-2 border-primary-700 bg-primary-700/10 hover:bg-primary-700/100 cursor-pointer ">
            Save
         </button>
      </div>
   );
}

export default InputArea;

import React from "react";

function SelectionArea({
  radioInput,
  selectedParent,
  setSelectedParent,
  isParentDataPending,
}) {
  const fetchedData = radioInput?.data;
  const fetchedName = radioInput?.name;

  console.log(fetchedName)
  return (
    <div className="w-full grid grid-rows-[auto_auto_1fr] place-items-center border">
      <div className="flex gap-2 items-center my-4">
        <h1 className="text-3xl ">Selection Area for</h1>
        <span className="text-3xl font-semibold px-2 rounded-md bg-primary-600/30">
          {fetchedName.charAt(0).toUpperCase() + fetchedName.slice(1)}
        </span>
      </div>

      <div className="w-full h-[1px] bg-base-dark dark:bg-primary-50"></div>

      {/* <select
            className="min-w-96 px-4 py-2 rounded-md border border-primary-950 bg-primary-700 bg-opacity-10"
            name="parent"
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
         >
            <option className="hover:bg-amber-200" value="">
               --Select Option--
            </option>
            {fetchedData.map((item) => (
               <option
                  className="hover:bg-amber-200"
                  key={item.name}
                  value={item.name.toLowerCase()}
               >
                  {item.name}
               </option>
            ))}
         </select> */}

      {isParentDataPending && (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      )}

      {!isParentDataPending && (
        <div className="min-w-96 max-h-screen place-self-start justify-self-center mt-4 overflow-y-auto">
          {/* <input
                type="text"
                className="w-full px-4 py-2 mb-1 border border-primary-500 outline-none bg-amber-300/10 rounded-md"
             /> */}
          <ul className="flex flex-col gap-1">
            {fetchedData.map((item) => (
              <label
                htmlFor={item.name}
                className={`w-full px-4 py-2 hover:bg-primary-700 cursor-pointer rounded-md text-primary-50 ${
                  selectedParent[fetchedName] === item.name ? "bg-primary-700" : "bg-primary-500 "
                }`}
                key={item?.name}
              >
                <input
                  type="radio"
                  name="selection"
                  id={item.name}
                  value={item.name}
                  checked={selectedParent[fetchedName] === item.name}
                  onChange={() =>
                    setSelectedParent((prevState) => ({
                      ...prevState,
                      [fetchedName]: item.name,
                    }))
                  }
                  className="cursor-pointer mr-4"
                />
                {item?.name}
              </label>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectionArea;

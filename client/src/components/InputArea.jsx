import React, { useState } from "react";
import axios from "axios";

function InputArea({
  setRadioInput,
  radioInput,
  isParentDataPending,
  setIsParentDataPending,
}) {
  const inputTypes = ["state", "district", "taluka", "village"];
  const [inputs, setInputs] = useState({});
  const [selectedInput, setSelectedInput] = useState(null);

  const handleInputChange = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleStateInput = async () => {
    const stateName = inputs[selectedInput];
    const response = await axios.post(`/api/admin/add/${stateName}`);
    console.log(response);
  };
  const handleDistrictInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs[selectedInput];
    const response = await axios.post(
      `/api/admin/add/${stateName}/${districtName}`,
    );
    console.log(response);
  };
  const handleTalukaInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs["district"];
    const talukaName = inputs[selectedInput];
    const response = await axios.post(
      `/api/admin/add/${stateName}/${districtName}/${talukaName}`,
    );
    console.log(response);
  };
  const handleVillageInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs["district"];
    const talukaName = inputs["taluka"];
    const villageName = inputs[selectedInput];
    const response = await axios.post(
      `/api/admin/add/${stateName}/${districtName}/${talukaName}/${villageName}`,
    );
    console.log(response);
  };

  const handleSave = () => {
    switch (selectedInput) {
      case "state":
        handleStateInput();
        break;
      case "district":
        handleDistrictInput();
        break;
      case "taluka":
        handleTalukaInput();
        break;
      case "village":
        handleVillageInput();
        break;

      default:
        break;
    }
    console.log("Saved inputs: ", inputs);
  };

  const handleShow = async (inputItem) => {
    try {
      setIsParentDataPending(true);
      const response = await axios.get(`/api/admin/get/${inputItem}s`);
      if (response?.data?.data) {
        setRadioInput({
          name: inputItem,
          data: response.data.data,
        });
        setIsParentDataPending(false);
      }
      // console.log(response.data.data);
    } catch (error) {
      console.log("Error occurred while fetching data: ", error);
    }
  };

  return (
    <div className="w-full grid grid-rows-[auto_auto_1fr] place-items-center border">
      <label className="text-3xl my-4">Select what you want to enter</label>
      <div className="w-full h-[1px] bg-base-dark dark:bg-primary-50"></div>
      <div className="flex flex-col items-center justify-center gap-16">
        <select
          name="input"
          value={selectedInput || ""}
          onChange={(e) => setSelectedInput(e.target.value)}
          className="px-4 py-2 rounded-md border bg-primary-700 bg-opacity-10"
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
                onClick={() => handleShow(inputItem)} // Set the selected input type
                disabled={
                  selectedInput === null ||
                  index > inputTypes.indexOf(selectedInput)
                }
                className={`px-4 py-2 rounded-md border ${
                  radioInput?.name === inputItem
                    ? "bg-primary-700 text-white"
                    : "bg-primary-50/50 text-black"
                } ${
                  selectedInput !== null &&
                  index <= inputTypes.indexOf(selectedInput)
                    ? "cursor-pointer hover:bg-primary-700 hover:text-white"
                    : "cursor-not-allowed opacity-30"
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
                value={inputs[inputItem] || ""}
                onChange={(e) => handleInputChange(inputItem, e.target.value)}
                className={`px-4 py-2 border outline-none rounded-md
                ${
                  selectedInput !== null &&
                  index <= inputTypes.indexOf(selectedInput)
                    ? ""
                    : "cursor-not-allowed opacity-30"
                }`}
              />
            </li>
          ))}
        </ul>

        <button onClick={handleSave} className="primary-btn">
          Save
        </button>
      </div>
    </div>
  );
}

export default InputArea;

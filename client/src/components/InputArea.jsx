import React, { useState } from "react";
import axios from "axios";

function InputArea({
  setRadioInput,
  radioInput,
  isParentDataPending,
  setIsParentDataPending,
  selectedParent,
}) {
  const inputTypes = ["state", "district", "taluka", "village"];
  const [inputs, setInputs] = useState({});
  const [selectedInput, setSelectedInput] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (name, value) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleStateInput = async () => {
    setIsPending(true);
    const stateName = inputs[selectedInput];
    try {
      const response = await axios.post(`/api/admin/add/${stateName}`);
      if (response.status === 200) {
        setSuccess("Your data added successfully!");
      }
    } catch (error) {
      console.log("Error while adding data in state: ", error);
      setError("Error: ", error);
    } finally {
      setIsPending(false);
    }
  };
  const handleDistrictInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs[selectedInput];
    try {
      const response = await axios.post(
        `/api/admin/add/${stateName}/${districtName}`,
      );
      if (response.status === 200) {
        setSuccess("Your data added successfully!");
      }
    } catch (error) {
      console.log("Error while adding data in district: ", error);
      setError("Error: ", error);
    } finally {
      setIsPending(false);
    }
  };
  const handleTalukaInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs["district"];
    const talukaName = inputs[selectedInput];
    try {
      const response = await axios.post(
        `/api/admin/add/${stateName}/${districtName}/${talukaName}`,
      );
      if (response.status === 200) {
        setSuccess("Your data added successfully!");
      }
    } catch (error) {
      console.log("Error while adding data in taluka: ", error);
      setError("Error: ", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleVillageInput = async () => {
    const stateName = inputs["state"];
    const districtName = inputs["district"];
    const talukaName = inputs["taluka"];
    const villageName = inputs[selectedInput];
    try {
      const response = await axios.post(
        `/api/admin/add/${stateName}/${districtName}/${talukaName}/${villageName}`,
      );
      if (response.status === 200) {
        setSuccess("Your data added successfully!");
      }
    } catch (error) {
      console.log("Error while adding data in village: ", error);
      setError("Error: ", error);
    } finally {
      setIsPending(false);
    }
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
          className="min-w-80 px-4 py-2 rounded-md border text-primary-50 bg-primary-700 bg-opacity-10"
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
              {/* {console.log("intputItem: ", inputItem)} */}
              <button
                onClick={() => handleShow(inputItem)} // Set the selected input type
                disabled={
                  selectedInput === null ||
                  index >= inputTypes.indexOf(selectedInput)
                }
                className={`px-4 py-2 rounded-md border ${
                  radioInput?.name === inputItem
                    ? "bg-primary-700 text-white"
                    : "bg-primary-50/50 text-black"
                } ${
                  selectedInput !== null &&
                  index < inputTypes.indexOf(selectedInput)
                    ? "cursor-pointer bg-primary-500 hover:bg-primary-700 hover:text-white"
                    : "cursor-not-allowed opacity-30"
                }`}
              >
                Show
              </button>
              <input
                type="text"
                name={inputItem}
                placeholder={
                  inputItem.charAt(0).toUpperCase() +
                  inputItem.slice(1) +
                  " " +
                  `(${
                    selectedInput === null || inputItem !== selectedInput
                      ? "Select"
                      : "Write"
                  })`
                }
                disabled={selectedInput === null || inputItem !== selectedInput}
                value={
                  selectedInput === null || inputItem !== selectedInput 
                   ? selectedParent[inputItem]
                   : inputs[selectedInput] || ''
                  
                }
                onChange={(e) => handleInputChange(inputItem, e.target.value)}
                className={`px-4 py-2 border outline-none rounded-md
                  ${
                    selectedInput !== null && index <= inputTypes.indexOf(selectedInput)
                      ? "bg-primary-300/25 dark:bg-primary-300/15"
                      : "cursor-not-allowed opacity-30"
                  }`}
              />
            </li>
          ))}
        </ul>

        <button onClick={handleSave} className="primary-btn">
          Save
        </button>

        <div>
          {isPending && (
            <span className="bg-blue-600 rounded-md px-4 py-2">
              Adding your data, please wait...
            </span>
          )}
          {error && !success && !isPending && (
            <span className="bg-red-600 rounded-md px-4 py-2">{error}</span>
          )}
          {success && !error && !isPending && (
            <span className="bg-green-600 rounded-md px-4 py-2">{success}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputArea;

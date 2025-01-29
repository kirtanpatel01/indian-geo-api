import React, { useEffect, useState } from "react";
import { SelectionArea, InputArea } from "./index";
import { FaMoon, FaSun } from "react-icons/fa";

function AdminPanel() {
  const [radioInput, setRadioInput] = useState({
    name: "",
    data: [],
  });

  const [selectedParent, setSelectedParent] = useState({
    state: "",
    district: "",
    taluka: "",
    village: "",
  });

  console.log(selectedParent)

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isParentDataPending, setIsParentDataPending] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-2 p-1 gap-1">
      <SelectionArea
        selectedParent={selectedParent}
        setSelectedParent={setSelectedParent}
        radioInput={radioInput}
        isParentDataPending={isParentDataPending}
      />
      <InputArea
        selectedParent={selectedParent}
        radioInput={radioInput}
        setRadioInput={setRadioInput}
        isParentDataPending={isParentDataPending}
        setIsParentDataPending={setIsParentDataPending}
      />

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full cursor-pointer absolute bottom-3 right-3 flex"
      >
        {!isDarkMode ? (
          <div className="flex gap-2">
            <FaMoon size={20} />
            {/* Dark */}
          </div>
        ) : (
          <div className="flex gap-2">
            <FaSun size={20} />
            {/* Light */}
          </div>
        )}
      </button>
    </div>
  );
}

export default AdminPanel;

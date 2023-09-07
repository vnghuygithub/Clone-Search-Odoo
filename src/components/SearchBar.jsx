import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";

function SearchBar() {
  const [fieldNames, setFieldNames] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    fieldNames: [],
    inputValues: [],
  });

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const [inputValues, setInputValues] = useState([]);

  const handleChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    fetchData(newInputValue);

    setInputValues([...inputValues, newInputValue]);
  };

  const toggleDropdown = () => {
    const dropdown = document.getElementById("dropdownMenu");
    if (dropdown.style.display === "block" && inputValue.trim() === "") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  };

  const addOption = (fieldName, inputValue) => {
    const { fieldNames, inputValues } = selectedOptions;
    const updatedFieldNames = [...fieldNames, fieldName];
    const updatedInputValues = [...inputValues, inputValue];

    setSelectedOptions({
      fieldNames: updatedFieldNames,
      inputValues: updatedInputValues,
    });

    setInputValue("");
    inputRef.current.focus();
  };

  const removeOption = (fieldName, inputValue) => {
    const { fieldNames, inputValues } = selectedOptions;
    const updatedFieldNames = fieldNames.filter((name) => name !== fieldName);
    const updatedInputValues = inputValues.filter(
      (value) => value !== inputValue
    );

    setSelectedOptions({
      fieldNames: updatedFieldNames,
      inputValues: updatedInputValues,
    });

    inputRef.current.focus();
  };

  useEffect(() => {
    const { fieldNames, inputValues } = selectedOptions;
    console.log("Selected Field Names:", fieldNames);
    console.log("Selected Input Values:", inputValues);
    console.log("Selected Input Values:", selectedOptions);
  }, [selectedOptions]);

  const fetchData = (inputValue) => {
    // const urls = selectedOptions.fieldNames.map((fieldName, index) => {
    //   return `http://localhost:3000/employees?${fieldName}_like=${selectedOptions.searchValue[index]}`;
    // });

    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((employee) => {
          return (
            inputValue &&
            employee &&
            employee.name &&
            employee.name.toLowerCase().includes(inputValue)
          );
        });

        if (results.length > 0) {
          const fieldNames = Object.keys(results[0]);
          console.log(fieldNames);
          setFieldNames(fieldNames);
        }
      });
  };

  return (
    <>
      <div style={{ display: "flex", width: "600px" }}>
        <div className="tag-list" id="myTagList">
          {selectedOptions.fieldNames.map((selectedOption, index) => (
            <button
              className="tag-item"
              key={selectedOption}
              onClick={() =>
                removeOption(selectedOption, selectedOptions.inputValues[index])
              }
            >
              {selectedOption} | {selectedOptions.inputValues[index]} x
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Tìm ..."
          value={inputValue}
          onChange={handleChange}
          onClick={toggleDropdown}
          ref={inputRef}
          id="myInput"
          style={{ flex: 1 }}
        />
      </div>

      <ul
        class="dropdown"
        id="dropdownMenu"
        style={{ display: "none", listStyleType: "none" }}
      >
        {fieldNames.map((fieldName) => (
          <li
            style={{ textDecoration: "none" }}
            onClick={() => addOption(fieldName, inputValue)}
          >
            Tìm kiếm <strong>{fieldName}</strong> cho "{inputValue}"
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchBar;

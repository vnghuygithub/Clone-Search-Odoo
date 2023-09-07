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
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    const newInputValue = event.target.value;
    setInputValue(newInputValue);
    fetchFieldNames(newInputValue);

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
    console.log("Selected Options:", selectedOptions);
  }, [selectedOptions]);

  // #1 call api
  const fetchFieldNames = (inputValue) => {
    fetch("http://localhost:3000/employees")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        const results = json.filter((employee) => {
          return (
            inputValue &&
            employee &&
            employee.name &&
            employee.name.toLowerCase().includes(inputValue)
          );
        });
        console.log(results);

        if (results.length > 0) {
          const fieldNames = Object.keys(results[0]);
          console.log(fieldNames);
          setFieldNames(fieldNames);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  useEffect(() => {
    fetchFieldNames(inputValue);
  }, []);

  const combinedUrl = selectedOptions.fieldNames
    .map((fieldName, index) => {
      const inputValue = selectedOptions.inputValues[index];
      return `${fieldName}_like=${inputValue}`;
    })
    .join("&");

  const fullUrl = `http://localhost:3000/employees?${combinedUrl}`;
  console.log(fullUrl);

  const fetchData = (inputValue) => {
    fetch(fullUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        const results = json;
        console.log(results);
        setResults(results);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };
  useEffect(() => {
    fetchData(inputValue);
  }, [selectedOptions]);

  return (
    <>
      <div style={{ display: "flex", width: "600px", top: 20 }}>
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

      <table style={{ marginTop: 20 }}>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Nationality</th>
        </tr>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.name}</td>
            <td>{result.age}</td>
            <td>{result.phone}</td>
            <td>{result.address}</td>
            <td>{result.nationality}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default SearchBar;

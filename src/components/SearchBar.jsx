import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setResults, setFieldsNames, onInputChange }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((employee) => {
          return (
            value &&
            employee &&
            employee.name &&
            employee.name.toLowerCase().includes(value.toLowerCase())
          );
        });

        if (results.length > 0) {
          const fieldNames = Object.keys(results[0]);
          setFieldsNames(fieldNames);
        }

        setResults(results);
        console.log(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    onInputChange(value);
  };

  return (
    <input
      placeholder="Tìm..."
      value={input}
      onChange={(e) => handleChange(e.target.value)}
    ></input>
  );
}

export default SearchBar;

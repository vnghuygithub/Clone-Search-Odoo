import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ setResults, setFieldsNames, onInputChange }) {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
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

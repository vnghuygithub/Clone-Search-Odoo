import React, { useState, useEffect } from "react";
import "./SearchResults.css";

function SearchResult({ fieldsNames, searchValue, setFinalResults }) {
  const [clickedFieldName, setClickedFieldName] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      if (!searchValue) {
        return; // Không gọi fetch nếu searchValue không tồn tại
      }

      let apiUrl = `http://localhost:3000/employees?${clickedFieldName}_like=${searchValue}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((json) => {
          const results = json;
          console.log(results);
          setFinalResults(results);
        });
    };

    fetchData();
  }, [clickedFieldName, searchValue]);

  const handleFieldNameClick = (fieldName) => {
    setClickedFieldName(fieldName);
  };

  return (
    <>
      <div className="search-results">
        {fieldsNames.map((fieldsName, id) => {
          return (
            <div
              style={{ marginBottom: 4 }}
              key={id}
              onClick={() => handleFieldNameClick(fieldsName)}
            >
              Tìm kiếm <strong>{fieldsName}</strong> cho "{searchValue}"
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchResult;

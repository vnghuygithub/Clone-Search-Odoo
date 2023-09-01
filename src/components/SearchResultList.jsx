import React from "react";
import { useState, useEffect } from "react";
import "./SearchResultList.css";

function SearchResult({ selectedFieldName, searchValue }) {
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchData = (searchValue) => {
      fetch("http://localhost:3000/employees")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((employee) => {
            return (
              employee &&
              employee[selectedFieldName] && // Sử dụng selectedFieldName để chọn trường cần so sánh
              employee[selectedFieldName]
                .toLowerCase()
                .includes(searchValue.toLowerCase()) // So sánh giá trị trường với searchValue
            );
          });
          setFilteredResults(results); // Lưu kết quả lọc vào filteredResults
          console.log(results);
        });
    };

    fetchData(searchValue);
  }, [searchValue]); // Sử dụng selectedFieldName và searchValue như dependencies của useEffect

  return (
    <div className="result-list">
      {filteredResults.map((result, id) => {
        return <div key={id}>{/* Hiển thị thông tin của kết quả ở đây */}</div>;
      })}
    </div>
  );
}

export default SearchResult;

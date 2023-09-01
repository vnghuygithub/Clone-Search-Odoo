import React from "react";
import "./SearchResults.css";

function SearchResult({
  results,
  fieldsNames,
  searchValue,
  setSelectedFieldName,
}) {
  // Hàm xử lý sự kiện khi người dùng nhấp vào tên trường
  const handleFieldNameClick = (fieldsName) => {
    // Gọi hàm để cập nhật biến trạng thái
    setSelectedFieldName(fieldsName);
    console.log(fieldsName);
  };

  return (
    <>
      <div className="search-results">
        {fieldsNames.map((fieldsName, id) => {
          return (
            <div key={id} onClick={() => handleFieldNameClick(fieldsName)}>
              Tim kiem <strong>{fieldsName}</strong> cho "{searchValue}"
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchResult;

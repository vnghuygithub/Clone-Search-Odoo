import React from "react";
import "./SearchResultList.css";

function SearchResult({ finalResults }) {
  return (
    <div className="result-list">
      <table>
        <tbody>
          {finalResults.map((finalResult, id) => (
            <tr key={id}>
              <td>{finalResult.name}</td>
              <td>{finalResult.age}</td>
              <td>{finalResult.phone}</td>
              <td>{finalResult.address}</td>
              <td>{finalResult.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResult;

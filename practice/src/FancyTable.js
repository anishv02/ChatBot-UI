import React from "react";
import "./FancyTable.css"; // Import custom CSS

const FancyTable = ({ data }) => {
  return (
    <div className="table-container">
      <h2>Embedding Documents</h2>
      <div className="table-wrapper">
        <table className="fancy-table">
          <thead>
            <tr>
              <th>Document Type</th>
              <th>Number of Documents</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.type}</td>
                <td>{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FancyTable;

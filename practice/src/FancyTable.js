import React, { useState } from "react";
import "./FancyTable.css"; // Import custom CSS

const FancyTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  // Dummy data with subcategories in 'parameters'
  const data = [
    {
      source: "Document A",
      type: "PDF",
      subject: "Finance Report",
      active: "Yes",
      parameters: {
        name: "John Doe",
        address: "123 Finance St",
        pin: "10001",
        postal: "NY"
      },
      content: "The financial report shows an upward trend in Q1 revenue..."
    },
    {
      source: "Document B",
      type: "Word",
      subject: "Project Plan",
      active: "No",
      parameters: {
        name: "Jane Smith",
        address: "456 Project Blvd",
        pin: "20002",
        postal: "CA"
      },
      content: "This document outlines the project plan and expected milestones..."
    },
    {
      source: "Document C",
      type: "Excel",
      subject: "Sales Data",
      active: "Yes",
      parameters: {
        name: "Alice Johnson",
        address: "789 Sales Ave",
        pin: "30003",
        postal: "TX"
      },
      content: "Sales data for the first half of the year by region..."
    },
    // Add more dummy data as needed
  ];

  const toggleExpand = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) {
      return ""; // or return 'N/A'
    }
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="table-container">
      <h2>Embedding Documents</h2>
      <div className="table-wrapper">
        <table className="fancy-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Type</th>
              <th>Subject</th>
              <th>Active</th>
              <th>Parameters</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="tooltip-custom">
                    {truncateText(row.source, 20)}
                    <span className="tooltip-text">{row.source}</span>
                  </td>
                  <td className="tooltip-custom">
                    {truncateText(row.type, 20)}
                    <span className="tooltip-text">{row.type}</span>
                  </td>
                  <td className="tooltip-custom">
                    {truncateText(row.subject, 20)}
                    <span className="tooltip-text">{row.subject}</span>
                  </td>
                  <td className="tooltip-custom">
                    {truncateText(row.active, 20)}
                    <span className="tooltip-text">{row.active}</span>
                  </td>
                  <td
                    onClick={() => toggleExpand(index)}
                    className="expandable-row"
                  >
                    <span className="expand-icon">
                      {expandedRows.includes(index) ? "▼" : "▶"}
                    </span>
                    {truncateText(
                      `${row.parameters.name}, ${row.parameters.address}`,
                      20
                    )}
                    {expandedRows.includes(index) && (
                      <div className="expanded-content">
                        <table className="subtable">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Address</th>
                              <th>Pin</th>
                              <th>Postal</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{row.parameters.name}</td>
                              <td>{row.parameters.address}</td>
                              <td>{row.parameters.pin}</td>
                              <td>{row.parameters.postal}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                  <td className="tooltip-custom">
                    {truncateText(row.content, 20)}
                    <span className="tooltip-text">{row.content}</span>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FancyTable;
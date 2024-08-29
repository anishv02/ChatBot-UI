import React, { useState } from "react";
import "./FancyTable.css"; // Import custom CSS

const FancyTable = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const data = [
    {
      source: "embedded_Details",
      type: "",
      status: "",
      subject: "",
      content: "",
      content_type: "",
      insert_time: "",
      inserted_by: "",
      last_updated_time: "",
      last_updated_by: "",
    },
    {
      source: "Data Source 1",
      type: "Type 1",
      status: "Active",
      subject: "Subject 1",
      content: "Content 1",
      content_type: "Text",
      insert_time: "2024-08-28 10:00",
      inserted_by: "User A",
      last_updated_time: "2024-08-28 11:00",
      last_updated_by: "User A",
    },
    {
      source: "Data Source 2",
      type: "Type 2",
      status: "Inactive",
      subject: "Subject 2",
      content: "Content 2",
      content_type: "Image",
      insert_time: "2024-08-28 10:30",
      inserted_by: "User B",
      last_updated_time: "2024-08-28 11:30",
      last_updated_by: "User B",
    },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
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
              <th>Status</th>
              <th>Subject</th>
              <th>Content</th>
              <th>Content Type</th>
              <th>Insert Time</th>
              <th>Inserted By</th>
              <th>Last Updated Time</th>
              <th>Last Updated By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td onClick={toggleExpand} className="expandable-row">
                <span className="text-align-left">embedded_Details</span>
                <span className="expand-icon">{isExpanded ? "▼" : "▶"}</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {isExpanded && (
              <tr>
                <td colSpan="10">
                  <div className="expanded-content">
                    {/* Your expandable content here */}
                    <p>
                      This is the additional content that appears when expanded.
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {data.slice(1).map((row, index) => (
              <tr key={index}>
                <td>{row.source}</td>
                <td>{row.type}</td>
                <td>{row.status}</td>
                <td>{row.subject}</td>
                <td>{row.content}</td>
                <td>{row.content_type}</td>
                <td>{row.insert_time}</td>
                <td>{row.inserted_by}</td>
                <td>{row.last_updated_time}</td>
                <td>{row.last_updated_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FancyTable;

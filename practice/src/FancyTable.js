import React, { useState } from "react";
import "./FancyTable.css"; // Import custom CSS

const FancyTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);

  const data = [
    {
      source: "embedded_Details",
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

  const toggleExpand = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  return (
    <div className="table-container">
      <h2>Embedding Documents</h2>
      <div className="table-wrapper">
        <table className="fancy-table">
          <thead>
            <tr>
              <th></th> {/* Empty column for the expand icon */}
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
              <th></th> {/* Empty column for the edit icon */}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td
                    onClick={() => toggleExpand(index)}
                    className="expandable-row"
                  >
                    <span className="expand-icon">
                      {expandedRows.includes(index) ? "▼" : "▶"}
                    </span>
                  </td>
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
                  <td>
                    <span className="edit-icon">✏️</span>
                  </td>
                </tr>
                {expandedRows.includes(index) && (
                  <tr>
                    <td colSpan="12">
                      <div className="expanded-content">
                        {/* Your expandable content here */}
                        <p>
                          This is the additional content that appears when
                          expanded.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FancyTable;

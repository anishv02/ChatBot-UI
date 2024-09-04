import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FancyTable.css"; // Import custom CSS

const FancyTable = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://cpschatuisvc.webfarm-dev.ms.com/api/DataEmbedding/getalldataembeddings");
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpand = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
                          This is the additional content that appears when expanded.
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
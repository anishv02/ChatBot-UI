import React, { useState } from "react";
import FancyTable from "./FancyTable";
import "./App.css";

const initialDocumentData = [
  { type: "Document Type 1", count: 3000 },
  { type: "Document Type 2", count: 200 },
  { type: "Document Type 3", count: 10 },
  { type: "Document Type 4", count: 5 },
];

const EmbeddingDocuments = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [documentData, setDocumentData] = useState(initialDocumentData);

  const handleFileChange = (event) => {
    if (!selectedType) {
      alert("Please select a document type before uploading.");
      return;
    }

    setUploadedFile(event.target.files[0]);

    // Update the count for the selected document type
    setDocumentData((prevData) =>
      prevData.map((doc) =>
        doc.type === selectedType ? { ...doc, count: doc.count + 1 } : doc
      )
    );
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="grid-container">
      <h1 className="header">Embedding Documents</h1>

      <div className="upload-section">
        <div className="upload-area">
          {/* Document Type Selection with Buttons */}
          <div className="document-type-buttons">
            <p>Select Document Type:</p>
            {documentData.map((doc, index) => (
              <button
                key={index}
                className={`document-type-button ${
                  selectedType === doc.type ? "selected" : ""
                }`}
                onClick={() => handleTypeSelect(doc.type)}
              >
                {doc.type}
                {selectedType === doc.type && (
                  <span className="active-icon">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* File Upload Section */}
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={handleFileChange}
            disabled={!selectedType}
          />
          <label htmlFor="fileInput" className="upload-label">
            <div className="upload-icon">+</div>
            <p className="upload-text">Drag & drop or click to choose files</p>
            <p className="upload-subtext">Max file size: 10 MB</p>
          </label>
          {uploadedFile && (
            <div className="uploaded-file-info">
              <p>{uploadedFile.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Fancy Table to Display Document Counts */}
      <FancyTable data={documentData} />
    </div>
  );
};

export default EmbeddingDocuments;

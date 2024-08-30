import React, { useState } from "react";
import FancyTable from "./FancyTable";
import "./App.css"; // Custom CSS for styling

const EmbeddingDocuments = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setUploadedFile(null);
    setUrl("");
    setSelectedType("");
    setUploadProgress(0);
  };

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
    setUploadProgress(44); // Mock progress for demonstration
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = () => {
    if (!selectedType) {
      alert("Please select a document type.");
      return;
    }

    if (!uploadedFile && !url) {
      alert("Please upload a file or enter a URL.");
      return;
    }

    // Simulate a file upload or URL submission process
    setUploadProgress(100); // Mock completion

    alert(
      `Uploaded ${
        uploadedFile ? uploadedFile.name : "No file"
      } and added URL ${url} as ${selectedType}`
    );

    // Close the popup after submission
    handleClosePopup();
  };

  return (
    <div className="embedding-documents-container">
      <div className="header-container">
        <h1 className="header">Embedding Documents</h1>
        <button className="upload-button" onClick={handleUploadClick}>
          Upload +
        </button>
      </div>

      <FancyTable />

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content animate__animated animate__fadeInUp">
            <div className="popup-header">
              <h2 className="popup-title">Upload Document</h2>
              <button className="close-popup-btn" onClick={handleClosePopup}>
                &times;
              </button>
            </div>
            <div className="popup-body">
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="type-dropdown"
              >
                <option value="" disabled>
                  Select Document Type
                </option>
                <option value="Document Type 1">Document Type 1</option>
                <option value="Document Type 2">Document Type 2</option>
                <option value="Document Type 3">Document Type 3</option>
                <option value="Document Type 4">Document Type 4</option>
              </select>

              <div className="file-upload-section">
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                />
                {uploadedFile && (
                  <div className="uploaded-file-info">
                    <p>{uploadedFile.name}</p>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${uploadProgress}%` }}
                      >
                        {uploadProgress}%
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="url-input-section">
                <input
                  type="text"
                  placeholder="Enter URL"
                  value={url}
                  onChange={handleUrlChange}
                  className="url-input"
                />
                <button className="add-url-button" onClick={handleSubmit}>
                  Add URL
                </button>
              </div>
            </div>
            <div className="popup-actions">
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
              <button className="close-button" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbeddingDocuments;

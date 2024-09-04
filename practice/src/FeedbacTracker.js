import React, { useState } from "react";
import "./FeedbackSection.css";

const feedbackData = [
  {
    name: "Alice Johnson",
    role: "Software Engineer",
    feedback:
      "This chatbot has significantly improved our team's efficiency in resolving technical queries.",
    rating: 5,
    date: "2024-08-14",
  },
  {
    name: "Bob Smith",
    role: "Data Scientist",
    feedback:
      "A great tool for quick data insights and resolving API issues on the fly.",
    rating: 4,
    date: "2024-08-13",
  },
  // More feedback entries...
];

const FeedbackSection = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const handleRowClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closePopup = () => {
    setSelectedFeedback(null);
  };

  return (
    <div className="feedback-section">
      <h2 className="feedback-title">User Feedback</h2>
      <p className="feedback-subtitle">
        Hear what our users have to say about their experience with our chatbot.
      </p>

      <div className="feedback-table">
        <div className="feedback-header">
          <span className="feedback-header-item">Name</span>
          <span className="feedback-header-item">Role</span>
          <span className="feedback-header-item">Feedback</span>
          <span className="feedback-header-item">Date</span>
        </div>

        <div className="feedback-rows">
          {feedbackData.map((feedback, index) => (
            <div
              key={index}
              className="feedback-row"
              onClick={() => handleRowClick(feedback)}
            >
              <span className="feedback-name">{feedback.name}</span>
              <span className="feedback-role">{feedback.role}</span>
              <span className="feedback-snippet">
                {feedback.feedback.slice(0, 50)}...
              </span>
              <span className="feedback-date">{feedback.date}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedFeedback && (
        <div className="feedback-popup">
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h3>{selectedFeedback.name}</h3>
            <p>{selectedFeedback.role}</p>
            <p>{selectedFeedback.feedback}</p>
            <div className="feedback-rating">
              {"★".repeat(selectedFeedback.rating)}
              {"☆".repeat(5 - selectedFeedback.rating)}
            </div>
            <p>{selectedFeedback.date}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackSection;
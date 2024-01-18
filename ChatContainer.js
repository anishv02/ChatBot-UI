// ChatContainer.js
import React from "react";
import "./ChatContainer.css";

const ChatContainer = ({ showIntro, onCloseIntro }) => {
  return (
    <div className={`chat-container ${showIntro ? "intro-visible" : ""}`}>
      {showIntro && (
        <div className="intro-box">
          <p>Welcome to Morgan Stanley Chat Bot!</p>
          <p>Explore the following options:</p>
          <button onClick={() => onCloseIntro("faqs")}>FAQs</button>
          <button onClick={() => onCloseIntro("history")}>Chat History</button>
        </div>
      )}

      {/* The rest of your existing components go here (ChatHeader, ChatMessages, UserInput) */}
    </div>
  );
};

export default ChatContainer;

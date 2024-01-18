// ChatMessages.js
import React from "react";

const ChatMessages = ({ messages }) => {
  return (
    <div className="chat-messages">
      {/* Render chat messages here */}
      {messages.map((msg, index) => (
        <div key={index} className={msg.sender}>
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;

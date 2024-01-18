// UserInput.js
import React from "react";

const UserInput = ({ value, onChange, onSend }) => {
  return (
    <div className="user-input-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};

export default UserInput;

// App.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import UserInput from "./UserInput";
import "./App.css"; // Import your styling

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setChatMessages([
        ...chatMessages,
        { sender: "user", message: userInput },
      ]);
      setUserInput("");
      // Add logic for the chat bot's response here
    }
  };

  return (
    <div className="app">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="chat-container">
        <ChatHeader />
        <ChatMessages messages={chatMessages} />
        <UserInput
          value={userInput}
          onChange={handleUserInput}
          onSend={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default App;

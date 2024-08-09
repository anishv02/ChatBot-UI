import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./UsageTracker.css";

const UsageTracker = () => {
  const [data, setData] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Dummy usage data
    const result = [
      { day: "2024-08-01", usage: 10, messages: 5 },
      { day: "2024-08-02", usage: 15, messages: 7 },
      { day: "2024-08-03", usage: 20, messages: 10 },
      { day: "2024-08-04", usage: 12, messages: 6 },
      { day: "2024-08-05", usage: 18, messages: 9 },
    ];

    // Dummy chat history
    const chatData = [
      { time: "2024-08-01 10:00", message: "User asked about weather." },
      { time: "2024-08-01 10:15", message: "User requested a joke." },
      {
        time: "2024-08-02 14:20",
        message: "User inquired about API integration.",
      },
      { time: "2024-08-03 09:30", message: "User asked for help with a bug." },
      {
        time: "2024-08-04 16:45",
        message: "User explored chatbot usage stats.",
      },
    ];

    // Setting the dummy data
    setData(result);
    setChatHistory(chatData);
  }, []);

  return (
    <div className="usage-tracker-container">
      <div className="sidebar">
        <h2>Chat History</h2>
        <ul className="chat-history">
          {chatHistory.map((chat, index) => (
            <li key={index}>
              <strong>{chat.time}</strong>: {chat.message}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <h1>User Activity Tracker</h1>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="messages" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UsageTracker;

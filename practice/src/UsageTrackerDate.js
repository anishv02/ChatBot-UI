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
  const [userProfile, setUserProfile] = useState({});
  const [selectedUser, setSelectedUser] = useState("user1");
  const [selectedDate, setSelectedDate] = useState("2024-08-01");

  // Dummy data for multiple users
  const usersData = {
    user1: {
      profile: {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-05 18:00",
      },
      usageData: [
        { day: "2024-08-01", time: "10:00", usage: 2, messages: 1 },
        { day: "2024-08-01", time: "12:00", usage: 3, messages: 2 },
        { day: "2024-08-02", time: "14:00", usage: 4, messages: 3 },
        { day: "2024-08-02", time: "16:00", usage: 2, messages: 1 },
        { day: "2024-08-03", time: "09:00", usage: 5, messages: 3 },
        { day: "2024-08-03", time: "11:00", usage: 4, messages: 2 },
        { day: "2024-08-04", time: "13:00", usage: 3, messages: 2 },
        { day: "2024-08-05", time: "15:00", usage: 4, messages: 3 },
      ],
      chatHistory: [
        { time: "2024-08-01 10:00", message: "User asked about weather." },
        { time: "2024-08-01 12:00", message: "User requested a joke." },
        {
          time: "2024-08-02 14:00",
          message: "User inquired about API integration.",
        },
        {
          time: "2024-08-02 16:00",
          message: "User asked for help with a bug.",
        },
        {
          time: "2024-08-03 09:00",
          message: "User explored chatbot usage stats.",
        },
      ],
    },
    user2: {
      profile: {
        name: "Jane Smith",
        email: "janesmith@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-04 14:00",
      },
      usageData: [
        { day: "2024-08-01", time: "11:00", usage: 1, messages: 1 },
        { day: "2024-08-01", time: "13:00", usage: 3, messages: 2 },
        { day: "2024-08-02", time: "10:00", usage: 2, messages: 1 },
        { day: "2024-08-02", time: "12:00", usage: 2, messages: 2 },
        { day: "2024-08-03", time: "08:00", usage: 3, messages: 2 },
        { day: "2024-08-04", time: "10:00", usage: 3, messages: 2 },
        { day: "2024-08-04", time: "12:00", usage: 4, messages: 3 },
        { day: "2024-08-05", time: "14:00", usage: 2, messages: 1 },
      ],
      chatHistory: [
        { time: "2024-08-01 11:00", message: "User asked about API limits." },
        { time: "2024-08-01 13:00", message: "User requested usage stats." },
        {
          time: "2024-08-02 10:00",
          message: "User explored API documentation.",
        },
        { time: "2024-08-03 08:00", message: "User reported a bug." },
        { time: "2024-08-04 10:00", message: "User checked chatbot uptime." },
      ],
    },
  };

  useEffect(() => {
    // Set data based on selected user and date
    const currentUser = usersData[selectedUser];
    const filteredData = currentUser.usageData.filter(
      (entry) => entry.day === selectedDate
    );
    setUserProfile(currentUser.profile);
    setData(filteredData);
    setChatHistory(
      currentUser.chatHistory.filter((chat) =>
        chat.time.startsWith(selectedDate)
      )
    );
  }, [selectedUser, selectedDate]);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="usage-tracker-container">
      <div className="header">
        <label htmlFor="userSelect">Select User: </label>
        <select
          id="userSelect"
          value={selectedUser}
          onChange={handleUserChange}
        >
          <option value="user1">John Doe</option>
          <option value="user2">Jane Smith</option>
        </select>

        <label htmlFor="dateSelect" style={{ marginLeft: "20px" }}>
          Select Date:{" "}
        </label>
        <input
          type="date"
          id="dateSelect"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="sidebar">
        <div className="profile-section">
          <img src={userProfile.avatar} alt="User Avatar" className="avatar" />
          <h2>{userProfile.name}</h2>
          <p>{userProfile.email}</p>
          <p>
            <strong>Last Active:</strong> {userProfile.lastActive}
          </p>
        </div>
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
              <XAxis dataKey="time" />
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

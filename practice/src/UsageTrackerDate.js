import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./UsageTracker.css";

const UsageTracker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("week"); // "week", "users", "details"
  const [weekDates, setWeekDates] = useState([]);

  // Dummy data for multiple users and dates
  const usersData = {
    "2024-08-26": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-08-27": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-08-28": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-08-29": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-08-30": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-08-31": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    "2024-09-01": [
      {
        name: "John Doe",
        email: "johndoe@example.com",
        avatar: "https://via.placeholder.com/150",
        lastActive: "2024-08-19 18:00",
        questionsData: [
          { time: "10:00", questions: 1 },
          { time: "12:00", questions: 2 },
        ],
        chatHistory: [
          { time: "10:00", message: "User asked about weather." },
          { time: "12:00", message: "User requested a joke." },
        ],
      },
      // More users...
    ],
    // More dates (up to 2024-08-25)...
  };

  // Weekly data calculation
  const weekData = weekDates.map((date) => ({
    date,
    totalQuestions: usersData[date]
      ? usersData[date].reduce(
          (acc, user) =>
            acc + user.questionsData.reduce((qAcc, d) => qAcc + d.questions, 0),
          0
        )
      : 0,
    totalUsers: usersData[date] ? usersData[date].length : 0,
  }));

  const handleUserBarClick = (userName) => {
    const user = usersData[selectedDate]?.find(
      (user) => user.name === userName
    );
    setSelectedUser(user);
    setView("details");
  };

  const handleBackClick = () => {
    if (view === "details") {
      setView("users");
    } else {
      setView("week");
    }
  };

  const handleDateBarClick = (date) => {
    setSelectedDate(date);
    setView("users");
  };

  const calculateWeekDates = (date) => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getUTCDay(); // 0 (Sunday) to 6 (Saturday)
    const diff =
      selectedDate.getUTCDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
    const startOfWeek = new Date(selectedDate.setUTCDate(diff));

    // Generate the 7 dates of the selected week
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setUTCDate(startOfWeek.getUTCDate() + i);
      dates.push(date.toISOString().split("T")[0]); // Format the date as 'YYYY-MM-DD'
    }

    return dates;
  };

  const handleWeekChange = (event) => {
    const selectedWeek = event.target.value; // This gives us the week in format YYYY-WXX
    const [year, week] = selectedWeek.split("-W");
    const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
    const daysOffset = (week - 1) * 7;
    const selectedDate = new Date(
      firstDayOfYear.setUTCDate(firstDayOfYear.getUTCDate() + daysOffset)
    );
    const newWeekDates = calculateWeekDates(selectedDate);
    setWeekDates(newWeekDates);
  };

  useEffect(() => {
    const currentWeekDates = calculateWeekDates(new Date());
    setWeekDates(currentWeekDates);
  }, []);

  return (
    <div className="usage-tracker-container">
      <header className="header">
        <h1>Usage Tracker</h1>
        <div className="header-info">
          <label htmlFor="weekSelect" className="fancy-date-label">
            Select Week:
          </label>
          <input
            type="week"
            id="weekSelect"
            onChange={handleWeekChange}
            className="fancy-date-picker"
          />
        </div>
      </header>

      {view === "week" && weekDates.length > 0 && (
        <div className="main-content full-width-graph">
          <h2>Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={weekData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalQuestions" fill="#82ca9d" name="Questions" />
              <Bar
                dataKey="totalUsers"
                fill="#8884d8"
                name="Users"
                onClick={(data) => handleDateBarClick(data.date)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === "users" && (
        <div className="main-content full-width-graph">
          <button onClick={handleBackClick} className="back-button">
            &larr; Back
          </button>
          <h2>Users Active on {selectedDate}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={
                usersData[selectedDate]?.map((user) => ({
                  name: user.name,
                  questions: user.questionsData.reduce(
                    (acc, d) => acc + d.questions,
                    0
                  ),
                })) || []
              }
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="questions"
                fill="#82ca9d"
                name="Questions"
                onClick={(data) => handleUserBarClick(data.name)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {view === "details" && selectedUser && (
        <div className="main-content">
          <button onClick={handleBackClick} className="back-button">
            &larr; Back
          </button>
          <div className="user-details">
            <div className="profile-section">
              <img
                src={selectedUser.avatar}
                alt="User Avatar"
                className="avatar"
              />
              <h2>{selectedUser.name}</h2>
              <p>Email: {selectedUser.email}</p>
              <p>Last Active: {selectedUser.lastActive}</p>
              <p>Date: {selectedDate}</p>
            </div>

            <div className="chat-history-section">
              <h3>Chat History on {selectedDate}</h3>
              <ul className="chat-history">
                {selectedUser.chatHistory.map((chat, index) => (
                  <li key={index}>
                    <strong>{chat.time}</strong>: {chat.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="usage-graph-section">
            <h3>User Activity Graph</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={selectedUser.questionsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="questions"
                  stroke="#82ca9d"
                  name="Questions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageTracker;

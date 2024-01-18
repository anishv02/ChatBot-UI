// Sidebar.js
import React from "react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-toggle" onClick={toggleSidebar}>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        {/* <div className="sidebar-title">Morgan Stanley</div> */}
      </div>
      <div className="sidebar-options">
        <div className="option">1. General Inquiries</div>
        <div className="option">2. Account Information</div>
        <div className="option">3. Technical Support</div>
        <div className="option">4. Billing and Payments</div>
        <div className="option">5. Feedback and Suggestions</div>
      </div>
    </div>
  );
};

export default Sidebar;

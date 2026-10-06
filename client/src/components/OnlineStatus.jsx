import React from "react";

const OnlineStatus = ({ isOnline = true }) => {
  return (
    <div className="online-status">
      <span
        className={`status-dot ${isOnline ? "online" : "offline"}`}
      ></span>

      <span className="status-text">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default OnlineStatus;
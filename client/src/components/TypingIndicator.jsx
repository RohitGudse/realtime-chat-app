import React from "react";
import "./TypingIndicator.css";

const TypingIndicator = ({
  username = "Someone",
  message = "is typing",
  showText = true,
}) => {
  return (
    <div className="typing-container" role="status" aria-live="polite">
      <div className="typing-avatar">
        <span>U</span>
      </div>

      <div className="typing-content">
        {showText && (
          <div className="typing-text">
            <span className="typing-username">{username}</span>
            <span className="typing-message"> {message}</span>
          </div>
        )}

        <div className="typing-dots">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
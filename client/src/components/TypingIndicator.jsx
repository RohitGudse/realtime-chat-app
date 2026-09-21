import React from "react";
import "./TypingIndicator.css";

const TypingIndicator = ({
  username = "Someone",
  message = "is typing",
  showText = true,
  avatar = "U",
}) => {
  const dots = Array.from({ length: 3 });

  return (
    <div
      className="typing-container"
      role="status"
      aria-live="polite"
      aria-label={`${username} ${message}`}
    >
      <div className="typing-avatar">
        <span>{avatar}</span>
      </div>

      <div className="typing-content">
        {showText && (
          <p className="typing-text">
            <strong className="typing-username">{username}</strong>{" "}
            <span className="typing-message">{message}</span>
          </p>
        )}

        <div className="typing-dots">
          {dots.map((_, index) => (
            <span
              key={index}
              className="typing-dot"
              style={{ animationDelay: `${index * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
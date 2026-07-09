import React from "react";

const Message = ({
  message = {},
  currentUser = "Rohit",
}) => {
  // ==============================
  // Extract Message Information
  // ==============================

  const username = message.username || "Unknown User";
  const userMessage = message.message || "No message available";
  const avatar =
    message.avatar ||
    "https://ui-avatars.com/api/?name=User&background=random";
  const time = message.time || "Just Now";
  const status = message.status || "Online";
  const isRead = message.isRead ?? false;

  // ==============================
  // Check Sender
  // ==============================

  const isCurrentUser = username === currentUser;

  // ==============================
  // Dynamic Styles
  // ==============================

  const containerStyle = {
    display: "flex",
    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
    marginBottom: "20px",
  };

  const cardStyle = {
    width: "380px",
    backgroundColor: isCurrentUser ? "#DCF8C6" : "#F2F2F2",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <img
            src={avatar}
            alt={username}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
          />

          <div>
            <h3 style={{ margin: "0" }}>{username}</h3>

            <small>{status}</small>
          </div>
        </div>

        <div>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              marginBottom: "15px",
            }}
          >
            {userMessage}
          </p>
        </div>

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <span>{time}</span>

          <span>
            {isRead ? "✔✔ Read" : "✔ Sent"}
          </span>
        </div>

        {isCurrentUser ? (
          <p
            style={{
              color: "green",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            This message was sent by you.
          </p>
        ) : (
          <p
            style={{
              color: "blue",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Message received from another user.
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
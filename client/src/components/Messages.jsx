import React from "react";

const Message = ({
  message = {},
  currentUser = "Rohit",
}) => {
  // ====================================================
  // Message Details
  // ====================================================

  const {
    username = "Unknown User",
    message: text = "No Message Found",
    avatar = "https://ui-avatars.com/api/?name=User&background=random",
    time = "Just Now",
    status = "Online",
    isRead = false,
    isEdited = false,
    replyCount = 0,
    messageType = "Text",
  } = message;

  // ====================================================
  // User Check
  // ====================================================

  const isCurrentUser = username === currentUser;

  // ====================================================
  // Helper Functions
  // ====================================================

  const getBackgroundColor = () => {
    return isCurrentUser ? "#DCF8C6" : "#F7F7F7";
  };

  const getBorderColor = () => {
    return isCurrentUser ? "#34A853" : "#DDDDDD";
  };

  const getStatusColor = () => {
    switch (status) {
      case "Online":
        return "green";
      case "Away":
        return "orange";
      case "Busy":
        return "red";
      default:
        return "#777";
    }
  };

  const getReadStatus = () => {
    return isRead ? "✔✔ Read" : "✔ Sent";
  };

  // ====================================================
  // Styles
  // ====================================================

  const wrapperStyle = {
    display: "flex",
    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
    marginBottom: "25px",
  };

  const cardStyle = {
    width: "420px",
    padding: "18px",
    borderRadius: "14px",
    background: getBackgroundColor(),
    border: `2px solid ${getBorderColor()}`,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
    transition: "0.3s",
  };

  const avatarStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: "15px",
    border: "2px solid #ddd",
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        {/* ================= Header ================= */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={avatar}
              alt={username}
              style={avatarStyle}
            />

            <div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                }}
              >
                {username}
              </h3>

              <small
                style={{
                  color: getStatusColor(),
                  fontWeight: "bold",
                }}
              >
                ● {status}
              </small>
            </div>
          </div>

          <div>
            <span
              style={{
                background: "#0d6efd",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "15px",
                fontSize: "12px",
              }}
            >
              {messageType}
            </span>
          </div>
        </div>

        {/* ================= Message ================= */}

        <div
          style={{
            minHeight: "80px",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              lineHeight: "28px",
              margin: 0,
            }}
          >
            {text}
          </p>
        </div>

        {/* ================= Extra Details ================= */}

        <div
          style={{
            marginTop: "15px",
            fontSize: "14px",
          }}
        >
          <p>
            <strong>Characters :</strong> {text.length}
          </p>

          <p>
            <strong>Replies :</strong> {replyCount}
          </p>

          <p>
            <strong>Edited :</strong>{" "}
            {isEdited ? "Yes" : "No"}
          </p>
        </div>

        <hr />

        {/* ================= Footer ================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{time}</span>

          <span
            style={{
              fontWeight: "bold",
              color: isRead ? "green" : "#666",
            }}
          >
            {getReadStatus()}
          </span>
        </div>

        {/* ================= Sender Info ================= */}

        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          {isCurrentUser ? (
            <p
              style={{
                color: "green",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              ✅ This message belongs to the logged-in user.
            </p>
          ) : (
            <p
              style={{
                color: "#0d6efd",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              📩 This message was received from another user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
import React, { useState } from "react";
import { socket } from "../socket";

const InputBox = ({ username, room }) => {
  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Handle input changes
  const handleMessageChange = (event) => {
    const text = event.target.value;

    setMessage(text);
    setCharacterCount(text.length);

    socket.emit("typing", room);
  };

  // Send chat message
  const sendMessage = async () => {
    if (message.trim() === "") {
      setStatusMessage("Please enter a message before sending.");
      return;
    }

    try {
      setIsSending(true);

      const messageData = {
        room: room,
        username: username,
        message: message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);

      setStatusMessage("Message sent successfully.");
      setMessage("");
      setCharacterCount(0);
    } catch (error) {
      setStatusMessage("Unable to send message.");
      console.log(error);
    } finally {
      setIsSending(false);
    }
  };

  // Press Enter to send
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  // Clear message
  const clearMessage = () => {
    setMessage("");
    setCharacterCount(0);
    setStatusMessage("");
  };

  return (
    <div className="input-box-container">

      <h2>Chat Message</h2>

      <p>
        Enter your message below and click the Send button to communicate
        instantly with other users in the selected chat room.
      </p>

      {statusMessage && (
        <p className="status-message">
          {statusMessage}
        </p>
      )}

      <div className="input-section">

        <label>Message</label>

        <textarea
          rows="4"
          placeholder="Type your message here..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          maxLength={300}
        ></textarea>

        <small>
          Characters: {characterCount} / 300
        </small>

      </div>

      <div className="button-section">

        <button
          onClick={sendMessage}
          disabled={message.trim() === "" || isSending}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>

        <button
          type="button"
          onClick={clearMessage}
        >
          Clear
        </button>

      </div>

      <div className="information-section">

        <h3>Chat Tips</h3>

        <ul>
          <li>Write clear and meaningful messages.</li>
          <li>Press Enter to send your message quickly.</li>
          <li>Maximum message length is 300 characters.</li>
          <li>Your username and current time are included automatically.</li>
          <li>Typing notifications are sent while you type.</li>
        </ul>

      </div>

    </div>
  );
};

export default InputBox;
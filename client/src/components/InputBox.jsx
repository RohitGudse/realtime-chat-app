/**
 * ----------------------------------------------------------
 * Component Name : InputBox
 * Description    :
 * This component allows users to type and send chat messages
 * inside a selected chat room using Socket.IO.
 *
 * Features
 * ----------------------------------------------------------
 * ✓ Send messages
 * ✓ Typing notification
 * ✓ Character counter
 * ✓ Enter key support
 * ✓ Clear message
 * ✓ Status messages
 * ✓ Loading state
 * ----------------------------------------------------------
 */

import React, { useState } from "react";
import { socket } from "../socket";

const MAX_MESSAGE_LENGTH = 300;

const InputBox = ({ username, room }) => {

  /**
   * ----------------------------------------------------------
   * State Variables
   * ----------------------------------------------------------
   */

  const [message, setMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  /**
   * ----------------------------------------------------------
   * Handle Text Input
   * ----------------------------------------------------------
   */

  const handleMessageChange = (event) => {
    const inputText = event.target.value;

    setMessage(inputText);
    setCharacterCount(inputText.length);

    socket.emit("typing", room);
  };

  /**
   * ----------------------------------------------------------
   * Send Message
   * ----------------------------------------------------------
   */

  const sendMessage = async () => {

    if (!message.trim()) {
      setStatusMessage("Please enter a message.");
      return;
    }

    try {

      setIsSending(true);

      const messageData = {
        room,
        username,
        message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);

      setMessage("");
      setCharacterCount(0);
      setStatusMessage("Message sent successfully.");

    } catch (error) {

      console.error(error);
      setStatusMessage("Failed to send message.");

    } finally {

      setIsSending(false);

    }
  };

  /**
   * ----------------------------------------------------------
   * Send Message using Enter Key
   * ----------------------------------------------------------
   */

  const handleKeyDown = (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

      event.preventDefault();

      sendMessage();

    }
  };

  /**
   * ----------------------------------------------------------
   * Clear Message
   * ----------------------------------------------------------
   */

  const clearMessage = () => {

    setMessage("");
    setCharacterCount(0);
    setStatusMessage("");

  };

  /**
   * ----------------------------------------------------------
   * Component UI
   * ----------------------------------------------------------
   */

  return (
    <div className="input-box-container">

      {/* Title */}

      <h2>Chat Message</h2>

      <p>
        Type your message below and send it instantly to everyone
        connected to the current chat room.
      </p>

      {/* Status Message */}

      {statusMessage && (
        <p className="status-message">
          {statusMessage}
        </p>
      )}

      {/* Message Input */}

      <div className="input-section">

        <label htmlFor="chatMessage">
          Message
        </label>

        <textarea
          id="chatMessage"
          rows={4}
          value={message}
          placeholder="Type your message..."
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          maxLength={MAX_MESSAGE_LENGTH}
        />

        <small>
          Characters : {characterCount} / {MAX_MESSAGE_LENGTH}
        </small>

      </div>

      {/* Buttons */}

      <div className="button-section">

        <button
          onClick={sendMessage}
          disabled={!message.trim() || isSending}
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

      {/* Information */}

      <div className="information-section">

        <h3>Chat Tips</h3>

        <ul>

          <li>Write meaningful messages.</li>

          <li>Press Enter to send instantly.</li>

          <li>Use Shift + Enter for a new line.</li>

          <li>
            Maximum message length is {MAX_MESSAGE_LENGTH} characters.
          </li>

          <li>
            Username and timestamp are added automatically.
          </li>

          <li>
            Typing notifications are sent while typing.
          </li>

        </ul>

      </div>

    </div>
  );
};

export default InputBox;
import { useState } from "react";
import { socket } from "../socket";

function InputBox({ username, room }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room,
        username,
        message,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessage("");
    }
  };

  return (
    <div>
      <input
        value={message}
        placeholder="Type message..."
        onChange={(e) => {
          setMessage(e.target.value);
          socket.emit("typing", room);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default InputBox;
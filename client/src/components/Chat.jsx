import { useEffect, useState } from "react";
import { socket } from "../socket";
import Message from "./Message";
import InputBox from "./InputBox";
import TypingIndicator from "./TypingIndicator";

function Chat({ username, room }) {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    socket.emit("join_room", { username, room });

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("typing", () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    });
  }, []);

  return (
    <div>
      <h2>Room: {room}</h2>

      <div>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </div>

      {typing && <TypingIndicator />}

      <InputBox username={username} room={room} />
    </div>
  );
}

export default Chat;
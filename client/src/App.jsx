import { useState } from "react";
import Chat from "./components/Chat";

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username && room) {
      setShowChat(true);
    }
  };

  return (
    <div>
      {!showChat ? (
        <div>
          <h2>Join Chat</h2>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinChat}>Join</button>
        </div>
      ) : (
        <Chat username={username} room={room} />
      )}
    </div>
  );
}

export default App;
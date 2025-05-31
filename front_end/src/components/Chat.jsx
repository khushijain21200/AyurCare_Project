import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";

const socket = io("http://localhost:3000");

export default function App() {
  const location=useLocation()
  const username=location.state.username;
  const role = "patient";
  const [loggedIn, setLoggedIn] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("doctorList", (list) => setDoctors(list));
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("loadMessages", (history) => {
      setMessages(history);
    });
    if (!username || !role) return alert("Please enter name and role");
    socket.emit("login", { username, role });
    setLoggedIn(true);
    if (role === "doctor") {
      const docRoom = username + "room";
      setRoom(docRoom);
      socket.emit("joinRoom", docRoom);
    }

    return () => {
      socket.off("doctorList");
      socket.off("receiveMessage");
      socket.off("loadMessages");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 

  const joinRoom = (doctorName) => {
    const roomName = doctorName + "room";
    setRoom(roomName);
    socket.emit("joinRoom", roomName);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && room) {
      socket.emit("sendMessage", { room, content: message });
      setMessage("");
    }
  };

  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 animate-dashFadeIn">
      <header className="bg-blue-600 text-white py-4 px-6 text-xl font-semibold">
        {username} ({role})
      </header>
      <main className="flex flex-col md:flex-row flex-1 p-4 space-y-4 md:space-y-0 md:space-x-4">
        {role === "patient" && (
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Select a Doctor</h3>
            {doctors.map((doc) => (
              <button
                key={doc}
                onClick={() => joinRoom(doc)}
                className="block w-full bg-blue-500 text-white rounded px-3 py-2 mb-2 hover:bg-blue-600"
              >
                {doc}
              </button>
            ))}
          </div>
        )}

        {room && (
          <div className="flex-1 bg-white rounded-lg shadow flex flex-col">
            <h3 className="text-lg font-semibold p-4 border-b">Chat Room: {room}</h3>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => {
  const isOwnMessage = msg.sender === username;
  return (
    <div
      key={i}
      className={`flex mr-[100px] ml-[100px]  ${isOwnMessage ? "justify-end " : "justify-start"}`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-300 text-black rounded-bl-none"
        }`}
      >
        <div className="text-xs font-semibold mb-1">
          {msg.sender}
        </div>
        <p>{msg.message || msg.content}</p>
      </div>
    </div>
  );
})}

              <div ref={messagesEndRef} />
            </div>
            <form
              onSubmit={sendMessage}
              className="flex items-center border-t p-4"
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded px-3 py-2 mr-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </main>

       {/* Fade-in Animation */}
      <style>
        {`
          @keyframes dashFadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-dashFadeIn {
            animation: dashFadeIn 1.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}

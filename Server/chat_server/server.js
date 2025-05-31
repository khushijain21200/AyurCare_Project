const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

mongoose.connect("mongodb+srv://admin:Ktuktuk%404321@cluster0.xh8tk.mongodb.net/user_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Message schema
const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  time: { type: Date, default: Date.now },
});

// Chat schema
function arrayLimit(val) {
  return val.length === 2;
}

const chatSchema = new mongoose.Schema({
  chatroom: {
    type: String,
    required: true
  },
  participants: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} must have exactly 2 participants'],
  },
  conversation: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

const doctors = ["Dr. Smith", "Dr. Jones", "Dr. Brown"];
const password={"Dr. Smith":"1234","Dr. Jones":"5678","Dr. Brown":"9012"}

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("login", async ({ username, role }) => {
    socket.username = username;
    socket.role = role;

    if (doctors.includes(username)) {
      // Doctor logging in
      const roomName = username + "room";
      socket.join(roomName);

      try {
        const chats = await Chat.find({ chatroom: roomName });
        const allMessages = chats.flatMap(chat => chat.conversation);
        socket.emit("loadMessages", allMessages);
      } catch (err) {
        console.error("Error loading doctor's messages:", err);
      }
    } else {
      // Patient logging in
      socket.emit("doctorList", doctors);
    }
  });

  socket.on("joinRoom", async (roomName) => {
    socket.join(roomName);
    socket.currentRoom = roomName;

    const doctorName = doctors.find(doc => roomName === doc + "room");
    const patientName = socket.username;

    if (!doctorName) return;

    const participants = [doctorName, patientName].sort();

    try {
      const chat = await Chat.findOne({
        chatroom: roomName,
        participants: { $all: participants, $size: 2 }
      });

      if (chat) {
        socket.emit("loadMessages", chat.conversation);
      } else {
        socket.emit("loadMessages", []);
      }

      console.log(`${socket.username} joined room ${roomName}`);
    } catch (err) {
      console.error("Error loading chat history:", err);
    }
  });

  socket.on("sendMessage", async ({ room, content }) => {
    const doctorName = doctors.find(doc => room === doc + "room");
    const sender = socket.username;

    if (!doctorName) return;

    const participants = [doctorName, sender].sort();

    const message = {
      sender,
      message: content,
      time: new Date(),
    };

    try {
      let chat = await Chat.findOne({
        chatroom: room,
        participants: { $all: participants, $size: 2 }
      });

      if (!chat) {
        chat = new Chat({
          chatroom: room,
          participants,
          conversation: [message],
        });
      } else {
        chat.conversation.push(message);
      }

      await chat.save();

      io.to(room).emit("receiveMessage", {
        sender,
        content,
      });
    } catch (err) {
      console.error("Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("Chat Server is up and running!");
});

const colors = require("colors");
const dotenv = require("dotenv").config();
const multer = require("multer");
const { errorHandler } = require("./middleware/errormidware");
const contactusRoutes = require("./routes/contact");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    credentials: true,   //might cause problems
    optionSuccessStatus: 200,
  },
});
// const path = require("path");
connectDB();
// Enable CORS
app.use(
  cors({
    origin: "*",
    credentials: true,   //might cause problems
    optionSuccessStatus: 200,
  })
);

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// User routes
app.use("/api", require("./routes/userRoutes"));
app.use("/api/conversations", require("./routes/conversations"));
app.use("/api/messages", require("./routes/messages"));


// Profile routes
// Cv routes
// Education routes
// Experience routes
// Projects routes
app.use("/profile", require("./routes/userProfile"));
app.use("/project", require("./routes/projects"));
app.use("/cv", require("./routes/userCv"));
app.use("/education", require("./routes/educations"));
app.use("/experience", require("./routes/experiences"));
app.use("/contactus", contactusRoutes);

app.use(errorHandler);


//for socket.io
let users = [];

const CreateUser=(userId,socketId)=>{
  users.push({ userId, socketId });
  console.log(users)
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => { 
  //when ceonnect
  console.log("a user connected.");
  socket.on("user", (data)=>{
    CreateUser(data.id, socket.id);
    io.emit("getUsers", users);
  })

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log("HELLO",senderId)
    console.log("Bye",receiverId)
    const user = getUser(receiverId);
    console.log("zzzz",user)
    if(senderId && receiverId && text && user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }

    //in case the user is offline
    else {
      console.log('reciever id not found')
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    console.log(users)
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
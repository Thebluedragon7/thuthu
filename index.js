require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const home = require("./routes/homeRouter");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Routes
app.use("/", home);

// on Connection
io.on("connection", (socket) => {
  socket.on("join-room", (roomID, userID) => {
    console.log(roomID, userID);
    socket.join(roomID);
    socket.to(roomID).emit("user-connected", userID);

    socket.on("disconnect", () => {
      socket.to(roomID).emit("user-disconnected", userID);
    });
  });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@alert-bluedragon.x77pp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("[+] Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.PORT || 9001;
server.listen(port, () => console.log(`[+] Listening to port ${port}`));

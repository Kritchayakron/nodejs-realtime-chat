const express = require("express")
const socketio = require("socket.io")
const morgan = require("morgan")
const app = express();
app.set("view engine", "ejs");
app.use(morgan('dev'))
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen(3000, () => {
  console.log("server running on port 3000");
});

// Initialize socket for the server
const io = socketio(server);
io.on("connection", socket => {
  socket.username = ""
  socket.on("change_username", data => {
    socket.username = data.username
  })
  // handle the new message event
  socket.on("new_message", data => {
    io.sockets.emit("receive_message", { message: data.message, username: socket.username})
  })
  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username })
  })

});
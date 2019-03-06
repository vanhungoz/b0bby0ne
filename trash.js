var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);

const mysql = require("mysql");

// var sql = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "",
//   database: "NodeJs"
// });

// sql.connect(err => {
//   if (err) {
//     console.log("error", err);
//     return;
//   }

//   console.log("SQL connect Successfully");
// });

server.listen(3000);

//io.sockets.emit
//socket.emit
//socket.broadcast.emit
//io.to("socketId").emit()

io.on("connection", socket => {
  let count = 0;
  console.log("Connect", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
  });

  socket.on("message", message => {
    console.log("receive message: ", message, "from ", socket.id);
    io.sockets.emit("message", message + `${count++}`);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

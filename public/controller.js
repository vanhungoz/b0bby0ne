var socket = io("http://localhost:3000");

socket.on("message", data => {
  console.log("data from sv", data);
  $("#content").append(data + ",");
});

$(document).ready(() => {
  $("#A").click(() => {
    socket.emit("message", "Hello");
  });
});

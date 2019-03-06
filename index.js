var logger = require("morgan");
var http = require("http");
var bodyParser = require("body-parser");
var express = require("express");
var request = require("request");
var router = express();

const ACCESS_TOKEN =
  "EAAcT61HPKDoBAC4pOkZAhtQXoLgXGWZBOcVO2JS4SITB5ZAoto0RYBoZClJHM6meUrenKcZCdD6TX32sIRGTZBNKZAecDu5cUFN3gTYvzLlo3TOc6HJbDnuBaufUvAF7awC1trzK9wcUUn7rXDC7nZBSphHO7loz9UmfYL44Y8bgGQZDZD";
const VERIFY = "b0bby0ne";
var app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
var server = http.createServer(app);

const mysql = require("mysql");

var sql = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "NodeJs"
});

sql.connect(err => {
  if (err) {
    console.log("error", err);
    return;
  }

  console.log("SQL connect Successfully");
});

app.listen(process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Server chạy ngon lành.");
});

app.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === VERIFY) {
    res.send(req.query["hub.challenge"]);
  }
  res.send("Error, wrong validation token");
});

// Đoạn code xử lý khi có người nhắn tin cho bot
app.post("/webhook", (req, res) => {
  var entries = req.body.entry;
  for (var entry of entries) {
    var messaging = entry.messaging;
    for (var message of messaging) {
      var senderId = message.sender.id;
      if (message.message) {
        // Nếu người dùng gửi tin nhắn đến
        if (message.message.text) {
          var text = message.message.text;
          if (text == "hi" || text == "hello") {
            sendMessage(senderId, "b0bby's Bot: " + "Xin Chào");
          } else {
            sendMessage(
              senderId,
              "b0bby's Bot: " +
                "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất."
            );
          }
        }
      }
    }
  }

  res.status(200).send("OK");
});

// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: {
      access_token: ACCESS_TOKEN
    },
    method: "POST",
    json: {
      recipient: {
        id: senderId
      },
      message: {
        text: message
      }
    }
  });
}

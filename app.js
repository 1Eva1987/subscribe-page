const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
  res.send("labas");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

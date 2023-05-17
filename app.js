require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

app.post("/", (req, res) => {
  // retrieve data from the request body sent by the client
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  // creating object containing subscribers data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  // converting data object in to JSON string
  var jsonData = JSON.stringify(data);

  // the URL endpoint of the Mailchimp API to which the request is made
  const url = "https://us14.api.mailchimp.com/3.0/lists/d9289c0c80";
  //   additional configuration containing method and authentication
  const options = {
    method: "POST",
    auth: "ieva1:" + process.env.KEY_TOKEN,
  };
  // HTTPS request
  const request = https.request(url, options, function (response) {
    // checking response status code and respons depending on status is sent to the user
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/success.html");
    }
    // loging respons when data received
    // response.on("data", function (data) {
    //   console.log(JSON.parse(data));
    // });
  });
  //   writing data to the request body
  request.write(jsonData);
  request.end();
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});

// audience id:
// d9289c0c80

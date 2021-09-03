require("dotenv").config();
const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const APIkey = process.env.API_KEY;


  // const url =
  //   "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" +
  //   city +
  //   "&appid=" +
  //   APIkey;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIkey;

  https.get(url, function (response) {
    // console.log(response);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;

      const description = weatherdata.weather[0].description;

      // res.write("<p>temp : " + temp + "</p>");
      // res.write("description : " + description);

      // res.send();

      res.render("result.ejs", {
        temp: temp,
        description: description
      });
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("server is started");
});
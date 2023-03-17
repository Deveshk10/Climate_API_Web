const express = require("express");
const https = require("https");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.post("/", (request, response) => {
  const query = request.body.cityName;
  const Apikey = "cc24b5babda7bf9ce78ce9d78d8dcd68";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    Apikey +
    "&units=" +
    units;
  https.get(url, (res) => {
    console.log(res.statusCode);
    res.on("data", (data) => {
      const Weatherdata = JSON.parse(data);
      console.log(Weatherdata);
      const temp = Weatherdata.main.temp;
      console.log(temp);
      const desc = Weatherdata.weather[0].description;
      console.log(desc);
      const icon = Weatherdata.weather[0].icon;
      const Imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      response.write(
        "<h1>The temperature in " +query+" is " + temp + " Degrees</h1>"
      );
      response.write("<h2>Feels like " + desc + "</h2>");
      response.write("<img src=" + Imageurl + ">");
    });
  });
});

app.listen(9000, () => {
  console.log("App is running on port 9000");
});

const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

dotenv.config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + "public"));

app.get("/", (req, res) => {
  res.render("weather");
});

app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("No data found");
    }

    const data = response.data;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    res.json({
      iconUrl: `http://openweathermap.org/img/wn/${icon}.png`,
      temperature,
      description,
      details,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

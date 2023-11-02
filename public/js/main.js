document.addEventListener("DOMContentLoaded", () => {
  const weatherDataEl = document.getElementById("weather-data");
  const cityInputEl = document.getElementById("city-input");
  const formEl = document.querySelector("form");

  formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;
    try {
      const response = await fetch(`/weather?city=${cityValue}`);
      if (response.ok) {
        const data = await response.json();
        displayWeatherData(data);
      } else {
        displayError("Could not fetch weather data");
      }
    } catch (error) {
      displayError("An error occurred. Please try again later.");
    }
  });

  function displayWeatherData(data) {
    const temperatureEl = weatherDataEl.querySelector(".temperature");
    const descriptionEl = weatherDataEl.querySelector(".description");
    const iconEl = weatherDataEl.querySelector(".icon");
    const detailsEl = weatherDataEl.querySelector(".details");

    temperatureEl.textContent = `${data.temperature}°C`;
    descriptionEl.textContent = data.description;
    iconEl.innerHTML = `<img src="${data.iconUrl}" alt="Weather Icon" />`;

    const detailsHTML = data.details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
    detailsEl.innerHTML = detailsHTML;
  }

  function displayError(errorMessage) {
    const temperatureEl = weatherDataEl.querySelector(".temperature");
    const descriptionEl = weatherDataEl.querySelector(".description");
    const iconEl = weatherDataEl.querySelector(".icon");
    const detailsEl = weatherDataEl.querySelector(".details");

    temperatureEl.textContent = "";
    descriptionEl.textContent = errorMessage;
    iconEl.innerHTML = "";
    detailsEl.innerHTML = "";
  }
});

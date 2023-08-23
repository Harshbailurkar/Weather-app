const timeEl = document.querySelector(".time");
const cityEl = document.querySelector(".city");
const countryEl = document.querySelector(".country");
const tempEl = document.querySelector(".temp");
const descriptionEl = document.querySelector(".des");
const errorEl = document.querySelector(".error");
const inputEl = document.getElementById("search-city");
const searchEl = document.getElementById("search-btn");
const weathericon = document.getElementById("weathericon");
const windspeedEl = document.querySelector(".windspeed");
const humidityEl = document.querySelector(".humidity");
const degree = document.querySelector(".degree");

fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=a05be99b59c95400567752b0623fa497`
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(time_date());
    timeEl.textContent = time_date().slice(0, 13) + " " + time_date().slice(-2);
    cityEl.textContent = data.name;
    countryEl.innerHTML = `<img src="https://flagsapi.com/${data.sys.country}/flat/64.png"></img>
      `;
    tempEl.textContent = Math.round(data.main.temp);

    degree.style.display = "block";
    weathericonimg(data.weather[0].description);
    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
    descriptionEl.innerHTML = data.weather[0].description;
    windspeedEl.textContent = " Wind Speed: " + windSpeedKmh + " km/h";
    humidityEl.textContent = " Humidity: " + data.main.humidity + "%";

    errorEl.style.display = "none";
  });
searchEl.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&units=metric&appid=a05be99b59c95400567752b0623fa497`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      timeEl.textContent = time_date();
      cityEl.textContent = data.name;
      countryEl.innerHTML = `<img src="https://flagsapi.com/${data.sys.country}/flat/64.png"></img>
      `;
      tempEl.textContent = Math.round(data.main.temp);

      degree.style.display = "block";
      weathericonimg(data.weather[0].description);
      const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
      descriptionEl.innerHTML = data.weather[0].description;
      windspeedEl.textContent = " Wind Speed: " + windSpeedKmh + " km/h";
      humidityEl.textContent = " Humidity: " + data.main.humidity + "%";

      errorEl.style.display = "none";
    })

    .catch((error) => {
      clear();
      // Handle errors that occur during the fetch or promise chain
      console.error("An error occurred:", error);
      if (error) {
        errorEl.style.display = "inline";
      }
    });
});

function time_date() {
  let dayname = "";
  let date = new Date();
  const day = date.getDay();
  switch (day) {
    case 0:
      dayname = "Sunday";
      break;
    case 1:
      dayname = "Monday";
      break;
    case 2:
      dayname = "Tuesday";
      break;
    case 3:
      dayname = "Wednesday";
      break;
    case 4:
      dayname = "Thursday";
      break;
    case 5:
      dayname = "Friday";
      break;
    case 6:
      dayname = "Saturday";
      break;
  }

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    const time = dayname + " " + formattedHours + ":" + formattedMinutes + " " + ampm;
    return time;
}

function clear() {
  timeEl.textContent = "";
  cityEl.textContent = "";
  countryEl.textContent = "";
  tempEl.textContent = "";
  descriptionEl.textContent = "";
  degree.textContent = "";
  weathericon.src = "";
  humidityEl.textContent = "";
  windspeedEl.textContent = "";
}

function weathericonimg(weather) {
  switch (weather) {
    case "clear sky":
      if (time_date().includes("AM") && time_date() < 12) {
        weathericon.src = "./images/01.png";
      } else {
        weathericon.src = "./images/clearnight.png";
      }
      break;
    case "few clouds":
      if (time_date().includes("AM") && time_date() < 12) {
        weathericon.src = "./images/fewclouds.png";
      } else {
        weathericon.src = "./images/nightfewclouds.png";
      }
      break;
    case "scattered clouds":
      weathericon.src = "./images/scatteredclouds.png";
      break;
    case "broken clouds":
      weathericon.src = "./images/brokenclouds.png";
      break;
    case "overcast clouds":
      weathericon.src = "./images/brokenclouds.png";
      break;
    case "shower rain":
      weathericon.src = "./images/showerrain.png";
      break;
    case "rain":
      if (time_date().includes("AM") && time_date() < 12) {
        weathericon.src = "./images/rain.png";
      } else {
        weathericon.src = "./images/nightrain.png";
      }
      break;
    case "thunderstorm":
      weathericon.src = "./images/thunderstorm.png";
      break;
    case "snow":
      weathericon.src = "./images/snow.png";
      break;
    case "mist":
      weathericon.src = "./images/mist.png";
      break;
    case "haze":
      weathericon.src = "./images/mist.png";
      break;
    default:
      weathericon.src = "./images/01.png";
  }

  return weathericon.src;
}

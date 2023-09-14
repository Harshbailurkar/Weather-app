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

async function defaultfun() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=YOUR-API-ID` //Enter Your API id here.
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(time_date());
      timeEl.textContent = time_date();
      cityEl.textContent = data.name;
      countryEl.innerHTML = `<img src="https://flagsapi.com/${data.sys.country}/flat/64.png"></img>
      `;
      tempEl.textContent = Math.round(data.main.temp);

      degree.style.display = "block";
      weathericonimg(data.weather[0].main);
      const windSpeedKmh = (data.wind.speed * 3.6).toFixed(2);
      descriptionEl.innerHTML = data.weather[0].description;
      windspeedEl.textContent = " Wind Speed: " + windSpeedKmh + " km/h";
      humidityEl.textContent = " Humidity: " + data.main.humidity + "%";

      errorEl.style.display = "none";
    });
}
async function fetchdatafunc() {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputEl.value}&units=metric&appid=YOUR-API-ID` //Enter Your API id here.
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
      weathericonimg(data.weather[0].main);
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
}
defaultfun();
inputEl.addEventListener("search", async () => {
  await fetchdatafunc();
});
searchEl.addEventListener("click", async () => {
  await fetchdatafunc();
});
let date = new Date();
const hours = date.getHours();

function time_date() {
  let dayname = "";
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

  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const time =
    dayname + " " + formattedHours + ":" + formattedMinutes + " " + ampm;
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
    case "Clear":
      if (hours > 5 && hours < 19) {
        weathericon.src = "./images/01.png";
      } else {
        weathericon.src = "./images/clearnight.png";
      }
      break;
    case "Clouds":
      if (hours > 5 && hours < 19) {
        weathericon.src = "./images/fewclouds.png";
      } else {
        weathericon.src = "./images/nightfewclouds.png";
      }
      break;
    case "Drizzle":
      weathericon.src = "./images/brokenclouds.png";
      break;
    case "Rain":
      if (hours > 5 && hours < 19) {
        weathericon.src = "./images/rain.png";
      } else {
        weathericon.src = "./images/nightrain.png";
      }
      break;
    case "Thunderstorm":
      weathericon.src = "./images/thunderstorm.png";
      break;
    case "Snow":
      weathericon.src = "./images/snow.png";
      break;
    case "Mist":
      weathericon.src = "./images/mist.png";
      break;
    case "Haze":
      weathericon.src = "./images/mist.png";
      break;
    case "Fog":
      weathericon.src = "./images/mist.png";
      break;
    case "Sand":
      weathericon.src = "./images/mist.png";
      break;
    case "Dust":
      weathericon.src = "./images/mist.png";
      break;
    case "Ash":
      weathericon.src = "./images/mist.png";
      break;
    case "Squall":
      weathericon.src = "./images/mist.png";
      break;
    case "Tornado":
      weathericon.src = "./images/mist.png";
      break;
    default:
      weathericon.src = "./images/01.png";
  }

  return weathericon.src;
}

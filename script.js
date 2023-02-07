const MyApiKey = "d116a04ac74ee540f979cc9a15799ffb";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const assets = [
  {
    id: "Clear",
    icon_day:
      "https://assets10.lottiefiles.com/private_files/lf30_moaf5wp5.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_iugenddu.json",
    cloud: "",
  },
  {
    id: "Clouds",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_ykkzuozu.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_5tzqguri.json",
    cloud: "https://assets10.lottiefiles.com/temp/lf20_VAmWRg.json",
  },
  {
    id: "Haze",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_jvkyx6tg.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_qqhrsksk.json",
    cloud: "https://assets10.lottiefiles.com/temp/lf20_VAmWRg.json",
  },
  {
    id: "Rain",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_rb778uhf.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_jr9yjlcf.json",
    cloud: "https://assets7.lottiefiles.com/private_files/lf30_orqfuyox.json",
  },
  {
    id: "Snow",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_w5u9xr3a.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_9bptg8sh.json",
    cloud: "https://assets3.lottiefiles.com/temp/lf20_WtPCZs.json",
  },
  {
    id: "Thunderstorm",
    icon_day:
      "https://assets2.lottiefiles.com/private_files/lf30_kj3arjju.json",
    icon_night:
      "https://assets2.lottiefiles.com/private_files/lf30_22gtsfnq.json",
    cloud: "https://assets4.lottiefiles.com/packages/lf20_kw1r63j7.json",
  },
];


let isLightMode;
const hours = new Date().getHours();
const isDayTime = hours > 6 && hours < 20;
const body = document.body;
const lang = document.querySelector(".lang_btn");
const infoButton = document.querySelector(".more_info_btn");
const info = document.querySelector(".more_info");
const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search_btn");
const city = document.querySelector(".location");
const date = document.querySelector(".date");
const temperature = document.querySelector(".temp");
const WeatherType = document.querySelector(".weather");
const maxTemperature = document.querySelector(".max_temp");
const minTemperature = document.querySelector(".min_temp");
const maxTemperatureTitle = document.querySelector(".max_temp_title");
const minTemperatureTitle = document.querySelector(".min_temp_title");
const windDegree = document.querySelector(".wind_degree");
const windSpeed = document.querySelector(".wind_speed");
const windDegreeTitle = document.querySelector(".wind_degree_title");
const windSpeedTitle = document.querySelector(".wind_speed_title");
const weatherIcon = document.querySelector(".weather_icon");
const infoText = document.querySelector(".more_info_txt");
const darkMode = document.querySelector(".dark_mode_btn");
const weatherCard = document.querySelector(".weather_container");
const weatherCardBody = document.querySelector(".weather_body");
const cloud1 = document.querySelector(".cloud1");
const cloud2 = document.querySelector(".cloud2");
const sky = document.querySelector(".wrapper");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const stars = document.querySelectorAll(".stars");

isDayTime ? (isLightMode = true) : (isLightMode = false);
if (!isLightMode) handleDarkMode();

async function renderWeatherAsync(City) {
  try {
    const weatherURL = `${API_URL}?q=${City}&appid=${MyApiKey}&units=metric&lang=${lang.innerHTML.toLowerCase()}`;
    const req = await fetch(weatherURL);
    const res = await req.json();
    const showWeather = await showWeatherInfo(res);
    return showWeather;
  } catch {
    infoButton.classList.remove("rotate");
    info.classList.remove("active");
    temperature.innerHTML = "";
    WeatherType.innerHTML = "";
    weatherIcon.innerHTML =
      '<lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_tzxtv5wy.json"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin:0 auto;" loop  autoplay></lottie-player>';
    date.innerHTML = "";
    infoButton.disabled = true;
    if (lang.innerHTML.toLowerCase() === "en") {
      city.innerHTML = "Search your location...";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Location not found!",
      });
    } else {
      city.innerHTML = "अपना स्थान खोजें...";
      Swal.fire({
        icon: "error",
        title: "गलती",
        text: "स्थान नहीं मिला!",
      });
    }
  }
}

searchInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    renderWeatherAsync(searchInput.value);
  }
});

searchButton.addEventListener("click", () => {
  renderWeatherAsync(searchInput.value);
});

function showWeatherInfo(weather) {
  cloud1.classList.remove("cloudMove1");
  cloud2.classList.remove("cloudMove2");
  city.innerHTML = `${weather.name} , ${weather.sys.country}`;
  if (lang.innerHTML.toLowerCase() === "en") {
    date.innerHTML = new Date().toLocaleDateString("en", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  } else {
    date.innerHTML = new Date().toLocaleDateString("hi", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
  temperature.innerHTML = `<h1>${Math.round(weather.main.temp)}&deg;C</h1>`;
  WeatherType.innerHTML = `${weather.weather[0].description}`;
  infoButton.disabled = false;

  assets.forEach((item) => {
    if (weather.weather[0].main === item.id) {
      isLightMode
        ? (weatherIcon.innerHTML = `<lottie-player src="${item.icon_day}"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin: 0 auto"  loop  autoplay></lottie-player>`)
        : (weatherIcon.innerHTML = `<lottie-player src="${item.icon_night}"  background="transparent"  speed="1"  style="width: 150px; height: 150px; margin: 0 auto"  loop  autoplay></lottie-player>`);
      cloud1.innerHTML = `<lottie-player
      src="${item.cloud}"
      background="transparent"
      speed="0.5"
      style="width: 400px; height: 400px"
      loop
      autoplay
    ></lottie-player>`;
      cloud2.innerHTML = `<lottie-player
      src="${item.cloud}"
      background="transparent"
      speed="0.5"
      style="width: 300px; height: 300px"
      loop
      autoplay
    ></lottie-player>`;
    }
  });
  setTimeout(() => {
    cloud1.classList.add("cloudMove1");
    cloud2.classList.add("cloudMove2");
  }, 1000);
  maxTemperature.innerHTML = `  ${Math.round(weather.main.temp_max)}&deg;C`;
  minTemperature.innerHTML = `  ${Math.round(weather.main.temp_min)}&deg;C`;
  windDegree.innerHTML = ` ${weather.wind.deg}^`;
  windSpeed.innerHTML = ` ${weather.wind.speed} M/S`;
}

infoButton.addEventListener("click", () => {
  infoButton.classList.toggle("rotate");
  info.classList.toggle("active");
});

lang.addEventListener("click", () => {
  if (lang.innerHTML.toLowerCase() === "en") {
    body.style.fontFamily = "Hind";
    lang.innerHTML = "HI";
    city.innerHTML = "अपना स्थान खोजें...";
    infoText.innerHTML = "और जानकारी";
    maxTemperatureTitle.innerHTML = "मैक्स:";
    minTemperatureTitle.innerHTML = "न्यूनतम:";
    windDegreeTitle.innerHTML = "डिग्री:";
    windSpeedTitle.innerHTML = "रफ़्तार:";
    if (searchInput.value !== "") {
      renderWeatherAsync(searchInput.value);
    }
  } else {
    body.style.fontFamily = "Poppins";
    city.innerHTML = "Search your location...";
    lang.innerHTML = "EN";
    infoText.innerHTML = "More Info";
    maxTemperatureTitle.innerHTML = "Max:";
    minTemperatureTitle.innerHTML = "Min:";
    windDegreeTitle.innerHTML = "Degree:";
    windSpeedTitle.innerHTML = "Speed:";
    if (searchInput.value !== "") {
      renderWeatherAsync(searchInput.value);
    }
  }
});


function handleDarkMode() {
  darkMode.classList.toggle("dark_txt");
  if (darkMode.classList.contains("dark_txt")) {
    isLightMode = false;
    darkMode.innerHTML = `<i class="fas fa-moon"></i>`;
    sky.style.backgroundImage = "linear-gradient(#2a2c36 70%, #121318)";
    stars.forEach((star) => {
      star.style.opacity = 1;
      sun.classList.remove("highNoonSun");
      moon.classList.add("fullMoon");
    });
  } else {
    isLightMode = true;
    darkMode.innerHTML = `<i class="fas fa-sun"></i>`;
    sky.style.backgroundImage = "linear-gradient(skyBlue 70%, dodgerBlue)";
    moon.classList.remove("fullMoon");
    sun.classList.add("highNoonSun");
    stars.forEach((star) => {
      star.style.opacity = 0;
    });
  }
  weatherCard.classList.toggle("dark_bg");
  weatherCardBody.classList.toggle("dark_bg");
  lang.classList.toggle("dark_txt");
  weatherCardBody.classList.toggle("dark_txt");
  infoButton.classList.toggle("dark_txt");
  if (searchInput.value != "") renderWeatherAsync(searchInput.value);
}
darkMode.addEventListener("click", handleDarkMode);

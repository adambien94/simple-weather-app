var myDataToday;
var myDataForecast;
var cityName = document.getElementById("city-name");
var cityDate = document.getElementById("date");
var dataBox = document.getElementById("data");
var mainIcon = document.getElementById("main-icon");
var windArrow = document.getElementById("wind-icon");
var input = document.getElementById("city-input");
var loading = document.getElementById("loading");
var submit = document.getElementById("check");
var temp = document.getElementById("temp");
var pressure = document.getElementById("pressure");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var forecastDay1 = document.getElementById("day1-day");
var forecastDay2 = document.getElementById("day2-day");
var forecastDay3 = document.getElementById("day3-day");
var forecastDay4 = document.getElementById("day4-day");
var forecastDay5 = document.getElementById("day5-day");
var forecastDays = [
  forecastDay1,
  forecastDay2,
  forecastDay3,
  forecastDay4,
  forecastDay5
];
var forecastIcon1 = document.getElementById("day1-icon");
var forecastIcon2 = document.getElementById("day2-icon");
var forecastIcon3 = document.getElementById("day3-icon");
var forecastIcon4 = document.getElementById("day4-icon");
var forecastIcon5 = document.getElementById("day5-icon");
var forecastIcons = [
  forecastIcon1,
  forecastIcon2,
  forecastIcon3,
  forecastIcon4,
  forecastIcon5
];
var forecastTemp1 = document.getElementById("day1-temp");
var forecastTemp2 = document.getElementById("day2-temp");
var forecastTemp3 = document.getElementById("day3-temp");
var forecastTemp4 = document.getElementById("day4-temp");
var forecastTemp5 = document.getElementById("day5-temp");
var forecastTemps = [
  forecastTemp1,
  forecastTemp2,
  forecastTemp3,
  forecastTemp4,
  forecastTemp5
];
var forecastTempNight1 = document.getElementById("day1-temp-night");
var forecastTempNight2 = document.getElementById("day2-temp-night");
var forecastTempNight3 = document.getElementById("day3-temp-night");
var forecastTempNight4 = document.getElementById("day4-temp-night");
var forecastTempNight5 = document.getElementById("day5-temp-night");
var forecastTempsNight = [
  forecastTempNight1,
  forecastTempNight2,
  forecastTempNight3,
  forecastTempNight4,
  forecastTempNight5
];
var days = ["Pon.", "Wt.", "Śr.", "Czw.", "Pią.", "Sob.", "Niedz."];
var tempUnit = "C";
var windUnit = "m/s";
var metricBtn = document.getElementById("metric-btn");
var imperialBtn = document.getElementById("imperial-btn");
var myRequest = new XMLHttpRequest();
var httpToday = "https://api.openweathermap.org/data/2.5/weather?q=";
var city;
var appid = "&appid=81631cc1843c3ced0966f73c8b9fcdf7";
var units = "&units=metric";
var urlToday;
var urlForecast;
var city2;

var httpForecast = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";

submit.addEventListener("click", function() {
  showData();
  city = document.getElementById("city-input").value = "City..";
});

input.addEventListener("click", function() {
  input.value = "";
});

imperialBtn.addEventListener("click", function() {
  units = "&units=imperial";
  windUnit = "miles/h";
  tempUnit = "F";
  changeUnits();
  imperialBtn.style.color = "#000";
  metricBtn.style.color = "#C6C6C6";
});

metricBtn.addEventListener("click", function() {
  units = "&units=metric";
  windUnit = "m/s";
  tempUnit = "C";
  changeUnits();
  imperialBtn.style.color = "#C6C6C6";
  metricBtn.style.color = "#000";
});

function showData() {
  city = document.getElementById("city-input").value;
  if (city == "city.." || city == "") {
    alert("Enter City");
  } else {
    city2 = city;
    urlToday = httpToday + city + appid + units;
    urlForecast = httpForecast + city + appid + units;
    loading.classList.toggle("loading-display");
    doRequest();
  }
}

function changeUnits() {
  urlToday = httpToday + city2 + appid + units;
  urlForecast = httpForecast + city2 + appid + units;
  loading.classList.toggle("loading-display");
  doRequest();
}

function doRequest() {
  myRequest.open("GET", urlToday);
  myRequest.onload = function() {
    myDataToday = JSON.parse(myRequest.responseText);
    doRequestForecast();
  };
  myRequest.send();
}

function doRequestForecast() {
  myRequest.open("GET", urlForecast);
  myRequest.onload = function() {
    myDataForecast = JSON.parse(myRequest.responseText);
    printData();
    dataBoxDisplay();
    loading.classList.toggle("loading-display");
  };
  myRequest.send();
}

function printData() {
  var x = Math.pow(10, 1);
  var temperature = Math.round(x * myDataToday.main.temp) / x;
  var windDeg = myDataToday.wind.deg;
  windArrow.style.transform = "rotate(" + windDeg + "deg)";
  temp.innerHTML = temperature + "&deg" + tempUnit;
  pressure.innerHTML = myDataToday.main.pressure + " hPa";
  humidity.innerHTML = myDataToday.main.humidity + "%";
  wind.innerHTML = myDataToday.wind.speed + " " + windUnit;
  cityName.innerHTML = myDataToday.name + ", " + myDataToday.sys.country;
  var iconId = myDataToday.weather[0].icon;
  mainIcon.style.background = "url('img/" + iconId + ".png')";
  mainIcon.style.backgroundSize = "cover";
  for (var i = 0; i < forecastDays.length; i++) {
    forecastIcons[i].style.background =
      "url('./img/forecast/" +
      myDataForecast.list[i].weather[0].icon +
      ".png')";
    forecastIcons[i].style.backgroundSize = "cover";
    forecastTemps[i].innerHTML = myDataForecast.list[i + 1].temp.day;
    forecastTempsNight[i].innerHTML = myDataForecast.list[i + 1].temp.night;
  }
}

function dataBoxDisplay() {
  dataBox.classList = "data-display";
}

setInterval(function() {
  var date = new Date();
  updateTime(date);
}, 1000);

function updateTime(date) {
  var day = date.getDay();
  var dayCount = day - 1;
  switch (day) {
    case 0:
      day = "niedziela";
      break;
    case 1:
      day = "poniedziałek";
      break;
    case 2:
      day = "wtorek";
      break;
    case 3:
      day = "środa";
      break;
    case 4:
      day = "czwartek";
      break;
    case 5:
      day = "piątek";
      break;
    case 6:
      day = "sobota";
      break;
  }
  var hours = date.getHours();
  var minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else if (hours < 10) {
    hours = "0" + hours;
  }
  var time = day + ", " + hours + ":" + minutes;
  cityDate.innerHTML = time;
  for (var i = 0; i < 5; i++) {
    dayCount++;
    if (dayCount > 6) {
      dayCount = 0;
    }
    forecastDays[i].innerHTML = days[dayCount];
  }
}

let test = {
  warzywa: 1,
  owoce: 2,
  mięso: 4,
  ser: 1
};

console.log(
  Object.keys(test).map(key => {
    return [...Array(test[key])]
      .map(i => {
        return key;
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  })
);

let result = document.querySelector(".weather-box #result");
let searchBtn = document.querySelector(".search-box #submit");
let city = document.querySelector(".search-box #city");

function getWeather() {
  let cityValue = city.value;
  if (cityValue.length === 0) {
    result.innerHTML = `<h3 class="empty">Please Enter A City Name</h3>`;
  } else {
    let myRequest = new XMLHttpRequest();
    myRequest.open(
      "GET",
      `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
    );
    myRequest.send();
    myRequest.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        let data = JSON.parse(this.responseText);
        result.innerHTML = `
        <h2>${data.name}</h3>
        <h3 class="weather_main">${data.weather[0].main}</h3>
        <h4 class="weather_description">${data.weather[0].description}</h4>
        <img class="icon" src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <span class="current_temp">${data.main.temp} &#176;</span>
        <div class="temp_min_max">
        <div class="temp_min">
        <p>min</p>
        <span>${data.main.temp_min} &#176;</span>
        </div>
        <div class="temp_max">
        <p>max</p>
        <span>${data.main.temp_max} &#176;</span>
        </div>
        </div>`;
      }
    };
  }
}
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

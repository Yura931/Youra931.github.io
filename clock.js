const clock = document.querySelector(".clock-box h1");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();
setInterval(getClock, 1000); 

const API_KEY = "ef94623e3d818eb5627743da484bd43d";


function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=matric`;
    fetch(url).then(response => response.json()).then(data => {
        const weather = document.querySelector(".weather-box span:first-child");
        const city = document.querySelector(".weather-box span:last-child");

        weather.innerText = `${data.weather[0].main} / ${data.name}`;
    })
}

function onGeoError() {
    alert("날씨정보를 가져올 수 없습니다.");
    const weather = document.querySelector(".weather-box span:first-child");
    weather.innerText = `날씨정보를 가져올 수 없습니다.`;
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
let search = document.getElementById('search');
let searchBtn = document.getElementById('searchBtn');
let API_Key = "717e55f39bf79b654";
let weather = document.querySelector('.weather');
let errorDiv = document.querySelector('.errorDiv');

const fetchData = () => {
    if (search.value.trim() == '') {
        errorDiv.innerHTML = `<h3> Please Enter a City ! </h3>`;
    }
    else {
        errorDiv.innerHTML = '';
        weather.innerText = 'Loading...'
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_Key}`;
        fetch (url) 
        .then ((res)=> {
            return res.json();
        }) 
        .then ((data)=> {  
            showData(data);
        })
        .catch ((err)=> {
            console.log(err);
            weather.innerText = ''
            errorDiv.innerHTML = `<h3> CITY NOT FOUND ! </h3>`;
        })
    }
}

let body = document.querySelector('body');

const showData = (data) => {
    console.log(data);
    const {country} = data.sys;
    const {temp,humidity} = data.main;
    const {main,icon,id} = data.weather[0];
    const {speed} = data.wind;
    let urlImage;
    let updatedTemp = Math.floor(temp);

    if (id >= 200 && id <= 232) {
        urlImage = '../Assets/imgs/scattered-thunderstorms.png'
        body.className = 'thunderstorms';
    }
    else if (id >= 300 && id <= 321) {
        urlImage = '../Assets/images/drizzle.png'
        body.className = 'drizzle';
    }
    else if (id >= 500 && id <= 531) {
        urlImage = '../Assets/imgs/heavy-rain.png'
        body.className = 'rain';
    }
    else if (id >= 600 && id <= 622) {
        urlImage = '../Assets/images/snow.png'
        body.className = 'snowflake';
    }
    else if (id >= 701 && id <= 781) {
        urlImage = '../Assets/images/mist.png'
        body.className = 'atmosphere';
    }
    else if (id == 800) {
        urlImage = '../Assets/images/clear.png'
        body.className = 'clear';
    }
    else if (id >= 801 && id <= 804) {
        urlImage = '../Assets/imgs/cloudy.png'
        body.className = 'cloudy';
    }

    weather.innerHTML = `
    <!--<img src="${urlImage}"/>
    <p>${data.name}, ${country}</p>
    <h1>${updatedTemp}°C</h1>
    <p>${main}</p> -->
    <!-- <img src="https://openweathermap.org/img/wn/${icon}.png" alt=""> -->
    <img src="${urlImage}" class="weather-icon">
            <h1 class="temp">${updatedTemp}°C</h1>
            <h2 class="city">${data.name}, ${country}</h2>
            <h4 class="main">${main}</h4>
            <div class="details">
                <div class="col">
                    <img src="./Assets/images/humidity.png" alt="">
                    <div>
                        <p class="humidity">${humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <img src="./Assets/images/wind.png" alt="">
                    <div>
                        <p class="wind">${speed} km/h</p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
    `
}

search.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        fetchData();
    }
})
searchBtn.addEventListener('click',fetchData)

let currentLocation = document.getElementById('currentLocation');

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position)=>{
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_Key}`;
        fetch(currentUrl)
        .then((res) => {
            return res.json();
        })
        .then((data)=> {
            showData(data);
        })
        .catch((err)=> {
            console.log(err);
        })
        // console.log(position.coords.longitude, position.coords.latitude);
    },(err)=>{
        // console.log(err);
        errorDiv.innerHTML = `<h3> ${err.message} </h3>`;
    })
}

currentLocation.addEventListener('click',getCurrentLocation);
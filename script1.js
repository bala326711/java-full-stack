const apiKey = "f140e2f060901a5d6083117318902fe5";

let chart;

function showTab(tab){

document.querySelectorAll(".dashboard").forEach(d=>{
d.classList.remove("active");
});

document.getElementById(tab).classList.add("active");

}

function getWeather(){

const city = document.getElementById("cityInput").value;

const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
.then(res=>res.json())
.then(data=>{

document.getElementById("cityName").innerText=data.name;

document.getElementById("temperature").innerText =
"Temperature: "+data.main.temp+"°C";

document.getElementById("description").innerText =
"Weather: "+data.weather[0].description;

document.getElementById("humidity").innerText =
"Humidity: "+data.main.humidity+"%";

document.getElementById("wind").innerText =
"Wind Speed: "+data.wind.speed+" km/h";

const icon =
"https://openweathermap.org/img/wn/" +
data.weather[0].icon +
"@2x.png";

document.getElementById("weatherIcon").src = icon;

getForecast(city);

})
.catch(()=>{
alert("City not found");
});

}

function getForecast(city){

const url =
`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

fetch(url)
.then(res=>res.json())
.then(data=>{

const forecastDiv = document.getElementById("forecastCards");

forecastDiv.innerHTML="";

let temps=[];
let labels=[];

for(let i=0;i<5;i++){

let item = data.list[i*8];

temps.push(item.main.temp);

labels.push(item.dt_txt.split(" ")[0]);

const card=`
<div class="card">
<p>${labels[i]}</p>
<p>${temps[i]}°C</p>
</div>
`;

forecastDiv.innerHTML+=card;

}

drawChart(labels,temps);

});

}

function drawChart(labels,data){

const ctx=document.getElementById("tempChart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:"line",
data:{
labels:labels,
datasets:[{
label:"Temperature °C",
data:data,
borderColor:"blue",
fill:false
}]
}
});

}

function getLocationWeather(){

navigator.geolocation.getCurrentPosition(position=>{

const lat=position.coords.latitude;
const lon=position.coords.longitude;

const url=
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(url)
.then(res=>res.json())
.then(data=>{

document.getElementById("cityInput").value=data.name;

getWeather();

});

});

}

showTab("current");

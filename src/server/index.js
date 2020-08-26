//const dotenv = require('dotenv');
//dotenv.config({path: '../.env'});
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
let geourl = 'http://api.geonames.org/searchJSON?q=';
let weatherurl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
let pixurl = 'https://pixabay.com/api/?';

//const key = 'd8c4b432924994fcf9466fa03ed7d8e1&units=imperial';
const key = process.env.owkey
const weatherBitKey = process.env.weather_bit_key
const geouser = process.env.geou;
const pix_key = process.env.pixy_key;
const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express()
const port = 8081
const fetch = require('node-fetch')
cityData = [];
projectData = {};
zipData = {};
tempData = {};
picData = [];
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log(key)
app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
  console.log(projectData)
  console.log('app.get/all run')
};

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.post('/add', async(req, res) => {
  try {
  projectData.date = req.body.date;
  projectData.userRes = req.body.userRes;
  projectData.temp = await getLatLon(zipData.zip)

  res.send();
  console.log('app.post/add run')
  console.log(projectData);

  const theLocation = await getLatLon(zipData.zip);
  console.log(theLocation);
  let lat = theLocation[0];
  let lon = theLocation[1];
  const theWeather = await getWeather(lat, lon)
  console.log(`The weather report shows:  ${theWeather}`);
  picData = await getPics(zipData.zip);
  console.log(`The pics are at: ${picData}`);

  } catch(e) {
  console.log(e);
  }
})

app.post('/zip', async(req, res) => {
  try {
  zipData.zip = req.body.zip;
  console.log(zipData);
  res.send();
  console.log(zipData.zip);
  //tempData = getTemperature(zipData.zip);
  cityData = await getLatLon(zipData.zip);
  picData = await getPics(zipData.zip);
  console.log('app.post/zip run');

  console.log(tempData);
  console.log(projectData);

  } catch(e) {
  console.log(e);
  }
})

const getTemperature = async(zip)=>{
  const url =  `${baseURL}${zip}&appid=${key}`;
  const response = await fetch(url);
  let data = await response.json();
  let fullTempData = data.main.temp;

  console.log(fullTempData);
  console.log('getTemp run');
  return fullTempData;
}

const getLatLon = async(city)=>{
  console.log('getLatLon');
  //const url = `${geourl}${city}&maxrows=1&username=${geouser}`;
  const url = `${geourl}${city}&maxRows=1&username=${geouser}`;
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);
  const lat = data.geonames[0].lat;
  const lon = data.geonames[0].lng;
  console.log(lat);
  console.log(lon);
  const coordinates = [lat, lon];
  return coordinates;
}

const getWeather = async(lat, lon)=>{
  console.log('getWeather');
  const url = `${weatherurl}${lat}&lon=${lon}&units=i&key=${weatherBitKey}`;
  const response = await fetch(url);
  let data = await response.json();
  const high = data.data[0].max_temp;
  const low = data.data[0].low_temp;
  const weather = data.data[0].weather.description;
  const weatherData = [high, low, weather];
  console.log(weatherData);
  return weather;
}

const getPics = async(city)=>{
  console.log('getpics');
  const url = `${pixurl}key=${pix_key}&q=${city}&image_type=photo`;
  const response = await fetch(url);
  let data = await response.json();
  let image_url = data.hits[0].webformatURL;
  console.log(image_url);
  return image_url;

}


const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')

let geourl = 'http://api.geonames.org/searchJSON?q=';
let weatherurl = 'https://api.weatherbit.io/v2.0/forecast/daily?lat=';
let weatherurl2 = 'https://api.weatherbit.io/v2.0/normals?lat=';
let pixurl = 'https://pixabay.com/api/?';

const key = process.env.owkey
const weatherBitKey = process.env.weather_bit_key
const geouser = process.env.geou;
const pix_key = process.env.pixy_key;
const bodyParser = require('body-parser');
const cors = require('cors');
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
  const theLocation = await getLatLon(zipData.zip);
  console.log(theLocation);
  let lat = theLocation[0];
  let lon = theLocation[1];
  let country = theLocation[2];
  picData = await getPics(zipData.zip);
  console.log(`trip length of ${req.body.triplength}`);
  console.log(`mmdd = ${req.body.monthanddate}`)
  const theWeather = await getWeather(lat, lon, req.body.tripLength, req.body.monthanddate);
  console.log(`The weather report shows:  ${theWeather}`);

  projectData.monthDate = req.body.monthanddate;
  projectData.length = req.body.tripLength;
  projectData.today = req.body.date;
  projectData.date = `Your trip starts ${req.body.userRes}... in ${req.body.tripLength} days`;
  projectData.userRes = `Beautiful ${zipData.zip}, ${country}`;
  projectData.temp = `${theWeather[2]}, High of ${theWeather[0]}, Low of ${theWeather[1]}`;
  projectData.city = zipData.zip;
  projectData.country = country;
  projectData.picture = picData;

  res.send();
  console.log('app.post/add run')
  console.log(projectData);

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
  cityData = await getLatLon(zipData.zip);
  picData = await getPics(zipData.zip);
  console.log('app.post/zip run');

  console.log(tempData);
  console.log(projectData);

  } catch(e) {
  console.log(e);
  }
})

const getLatLon = async(city)=>{
  console.log('getLatLon');
  const url = `${geourl}${city}&maxRows=1&username=${geouser}`;
  const response = await fetch(url);
  let data = await response.json();
  console.log(data);
  const lat = data.geonames[0].lat;
  const lon = data.geonames[0].lng;
  const country = data.geonames[0].countryName;
  console.log(lat);
  console.log(lon);
  console.log(country)
  const coordinates = [lat, lon, country];
  return coordinates;
}

const getWeather = async(lat, lon, tMinus, hDate)=>{
  console.log('getWeather');
  if (tMinus < 16) {
    let url = `${weatherurl}${lat}&lon=${lon}&units=i&key=${weatherBitKey}`;
    const response = await fetch(url);
    let data = await response.json();
    const high = data.data[tMinus].max_temp;
    console.log(`before 15 high ${high}`)
    const low = data.data[tMinus].low_temp;
    const weather = data.data[tMinus].weather.description;
    const weatherData = [high, low, weather];
    console.log(weatherData);
    return weatherData;
  } else {
    let url2 = `${weatherurl2}${lat}&lon=${lon}&units=i&start_day=${hDate}&end_day=${hDate}&tp=daily&key=${weatherBitKey}`;
    const response = await fetch(url2);
    let data = await response.json();
    console.log(`url2 = ${url2}`)
    console.log(`data after 15 is ${data}`)
    const high = data.data[0].max_temp;
    console.log(`after 15 high ${high}`)
    const low = data.data[0].min_temp;
    const weather = 'Historically';
    const weatherData = [high, low, weather];
    console.log(weatherData);
    return weatherData;
  }
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

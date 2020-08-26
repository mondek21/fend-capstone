//const dotenv = require('dotenv');
//dotenv.config({path: '../.env'});
const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//const key = 'd8c4b432924994fcf9466fa03ed7d8e1&units=imperial';
const key = process.env.owkey
const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express()
const port = 8081
const fetch = require('node-fetch')
projectData = {};
zipData = {};
tempData = {};
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
  projectData.temp = await getTemperature(zipData.zip)

  res.send();
  console.log('app.post/add run')
  console.log(projectData);
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
  tempData = await getTemperature(zipData.zip);

  console.log('app.post/zip run')

  console.log(tempData);
  console.log(projectData)
  } catch(e) {
  console.log(e);
  }
})

const getTemperature = async(zip)=>{
  const url =  `${baseURL}${zip}&appid=${key}`;
  const response = await fetch(url);
  console.log(response);
  let data = await response.json();
  let fullTempData = data.main.temp;

  console.log(fullTempData);
  console.log('getTemp run');
  return fullTempData;
}

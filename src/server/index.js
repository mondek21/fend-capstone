const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')

const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express()
const port = 8081
projectData = {};

app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.get('/', function (req, res) {
//  res.sendFile('dist/index.html')
//})

app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
  console.log(projectData)
};

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
/// changed from '/'
app.post('/add', addData);
function addData(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.userRes = req.body.userRes;
  console.log(projectData);
  res.send();
  console.log(projectData);
}

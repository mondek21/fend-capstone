// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
const cors = require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;
// Setup Server
const server = app.listen(port, listening);
function listening() {
  //console.log(server)
  console.log("server running:");
  console.log(`on localhost: ${port}`);
};
//GET route to return projectData
app.get('/all', sendData);
function sendData(req, res) {
  res.send(projectData);
};
//POST route to add data to projectData
app.post('/', addData);
function addData(req, res) {
  projectData.temp = req.body.temp;
  projectData.date = req.body.date;
  projectData.userRes = req.body.userRes;
  res.end();
  console.log(projectData);
}

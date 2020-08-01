/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = 'd8c4b432924994fcf9466fa03ed7d8e1&units=imperial';
let zipInput = document.getElementById('zip');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
/* Function to GET Web API Data*/
const getTemperature = async(baseURL, zip, key)=>{
  const url =  `${baseURL}${zip}&appid=${key}`;
  console.log(url);
  const response = await fetch(url)
  console.log(response);
  let data = await response.json();
  console.log(data);
  return data;
}
/* Function to POST data */
const postData = async(path, data) => {
  const response = await fetch(path, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
/*update UI function*/
const updateUI = async() => {
  const response = await fetch('/all');
  console.log(response);
  try {
  //const allData = input;
  const allData = await response.json();
  console.log(allData);
  console.log('updating UI');
  document.getElementById('date').innerHTML = `<span class="entry-item">Date: </span>${allData.date}`
  document.getElementById('temp').innerHTML = `<span class="entry-item">Temperature: </span>${allData.temp}`
  document.getElementById('content').innerHTML = `<span class="entry-item">You feel: </span>${allData.userRes}`
  }
  catch(error) {
    console.log('error', error);
  }
}
/*post project data*/
const performAction = async function() {
  const webTemp = await getTemperature(baseURL, zipInput.value, key)
  const data = {
    temp: webTemp.main.temp,
    date: newDate,
    userRes: feelings.value
  }

  console.log(data);
    /*add data to Post*/
  await postData('/add', data)

    //update UI
  updateUI()
}
/*Add event listener*/
document.getElementById('generate').addEventListener('click', performAction);

export { getTemperature, postData, updateUI, performAction }

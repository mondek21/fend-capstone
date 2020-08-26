/* Global Variables */
//let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

let zipInput = document.getElementById('zip');
let dateInput = document.getElementById('feelings');

//const key = process.env.w_app_key;
//console.log(key);
// Create a new date instance dynamically with JS
let d = new Date();
let todayDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

console.log(todayDate);

//console.log(milDiff);
/* Function to GET Web API Data*/
/* Function to POST data */
const postData = async(path, data) => {
  console.log('postData')
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
  console.log('updateUI');
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
  console.log('perform action')
/*add zip data to post*/
  const zipCodeInput = {
    zip: zipInput.value
  }
  await postData('/zip', zipCodeInput)
  let thenDate = dateInput.value;
  let dateDifference = thenDate-todayDate;
  console.log(thenDate);
  console.log(todayDate);
  console.log(dateDifference);
  //let milToday = todayDate.getTime();
  let date1 = new Date(todayDate);
  let date2 = new Date(thenDate);
  let date3 = (date2 - date1)/(60*60*24*1000);
  console.log(date3);
  //let milThen = thenDate.getTime();
  let milDiff = milThen - milToday;
  console.log('webTemp')

  const data = {
    //temp: tempFromServer,
    date: todayDate,
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

export { /*getTemp,*/ postData, updateUI, performAction }

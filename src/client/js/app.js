
let zipInput = document.getElementById('zip');
let dateInput = document.getElementById('feelings');

let d = new Date();
let todayDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();

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

const updateUI = async() => {

  const response = await fetch('/all');
  console.log('updateUI');
  console.log(response);
  try {
    const allData = await response.json();
    console.log(allData);
    console.log('updating UI');
    document.getElementById('date').innerHTML = `<span class="entry-item">Plan: </span>${allData.date}`
    document.getElementById('temp').innerHTML = `<span class="entry-item">Forecast: </span>${allData.temp}`
    document.getElementById('content').innerHTML = `<span class="entry-item">Destination: </span>${allData.userRes}`
    //document.getElementById('pic').innerHTML = `<span class="entry-item"><img src=${allData.picture} width="50%" </span>`
    document.getElementById('pic').innerHTML = `<div class="entry-item"><img src=${allData.picture} </div>`
  }
  catch(error) {
    console.log('error', error);
  }
}
const performAction = async function() {
  console.log('perform action')
  const zipCodeInput = {
    zip: zipInput.value
  }
  await postData('/zip', zipCodeInput)
  let thenDate = dateInput.value;
  let date1 = new Date(todayDate);
  let date2 = new Date(thenDate);
  let date3 = (date2 - date1)/(60*60*24*1000);
  console.log(`date2 = ${date2}`)

  let myMonth = (date2.getMonth()+1);
  let month = (`0${myMonth}`).slice(-2);
  let myDay = (date2.getDate()+1);
  let day = (`0${myDay}`).slice(-2);
  console.log(`month = ${month}`)

  console.log(`day = ${day}`);
  let mmdd = (`${month}-${day}`);
  console.log(mmdd);
  console.log(`date input ${dateInput.value}`);
  /*let trippyDate = thenDate[0,2];
  console.log(`trippyDate ${trippyDate}`)*/
  console.log(date3);
  console.log('webTemp')

  const data = {
    monthanddate: mmdd,
    tripLength: date3,
    tripDate: date2,
    date: date1,
    userRes: feelings.value
  }
  console.log(data);

  await postData('/add', data)

  updateUI()
}
/*Add event listener*/
document.getElementById('generate').addEventListener('click', performAction);

export { postData, updateUI, performAction }

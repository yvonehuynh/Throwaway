var Qs = require('qs');
// const firebase = require("./firebase");

var config = {
  apiKey: "AIzaSyDyr5ZdZEHyHb5bofD0TZdO_fiU49MxO-0",
  authDomain: "throwaway-39c5b.firebaseapp.com",
  databaseURL: "https://throwaway-39c5b.firebaseio.com",
  projectId: "throwaway-39c5b",
  storageBucket: "",
  messagingSenderId: "489478107476"
};
firebase.initializeApp(config);

function runRequest() {
  return axios({
    method: 'GET',
    url: 'https://proxy.hackeryou.com',
    dataResponse: 'json',
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: {
      reqUrl: `https://baconipsum.com/api/?type=all-meat&sentences=10&start-with-lorem=1`,
      xmlToJSON: false
    }
  }).then((result) => {
    const res = result.data;
    getUserName(res);
    getPassword(res);
    return res;
  })
    .catch((error) => {
      alert("Oops!");
    });
}

// function that takes the API data and turns it into a random username
const getUserName = (res) => {
  let array = randomizeWords(res);
  array = array.replace(/,/, "");
  let para = document.getElementById("username");
  para.innerHTML = array;
  console.log("username: ", array);
  return array;
}

// function to generate randomized password
const getPassword = (res) => {
  let password = randomizeWords(res);
  password = password.charAt(0).toUpperCase() + password.slice(1);
  let specialChar = '!?=#*$@+-.';
  const index = Math.floor(Math.random() * specialChar.length);
  specialChar = specialChar[index];
  password = password + specialChar;
  if (password.length < 8) {
    getPassword();
  } else {
    let para = document.getElementById("password");
    para.innerHTML = password;
    console.log("password: ", password)
    return password
  }
}

const randomizeWords=(res)=>{
  // get random array from API results (API results return different arrays)
  const randomItem = res[Math.floor(Math.random() * res.length)];
  // turn words in the sentence to separate strings in an array
  const randomItemtoString = randomItem.split(" ");
  // first word: get random word in the array
  const randomWord = randomItemtoString[Math.floor(Math.random() * randomItemtoString.length)];
  // second word: get second random word in array
  const secondWord = randomItemtoString[Math.floor(Math.random() * randomItemtoString.length)];
  // generate a random number up to 1000
  const randomNum = Math.floor(Math.random() * 1000)
  // combine first word, second word, and random number to create random username
  let randomizedWord = randomWord + secondWord + randomNum;
  randomizedWord.replace(/.,/, "");
  return randomizedWord;
}

document.getElementById("generateUsername").addEventListener("click", function(e){
  e.preventDefault();
  runRequest();
})

document.getElementById("save").addEventListener("click", function(e){
  e.preventDefault();
 // console.log("boomboom: ", username, "password: ", password);
 const username = document.getElementById("username").innerHTML;
 const password = document.getElementById("password").innerHTML;
  const throwawayDetails={
    username,
    password
  }
  const dbRef = firebase.database().ref();
  dbRef.push(throwawayDetails)
})

displayFav();
function displayFav(){
  const dbRef = firebase.database().ref();

  dbRef.on("value", (firebaseData) => {
    let accounts = [];
    const accountData = firebaseData.val();
    for (let itemKey in accountData) {
      accountData[itemKey].key = itemKey;
      accounts.push(accountData[itemKey])
      const password = accountData[itemKey]["password"];
      const user = accountData[itemKey]["username"];
      console.log("user: ", user, "password: ", password)
    }
  });

}
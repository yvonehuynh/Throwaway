var Qs = require('qs');

function runRequest() {
  return axios({
    method: 'GET',
    url: 'https://proxy.hackeryou.com',
    dataResponse: 'json',
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
    params: {
      reqUrl: `https://baconipsum.com/api/?type=all-meat&sentences=3&start-with-lorem=1`,
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
  let array = randomizeWords(res)
  let para = document.getElementById("username");
  para.innerHTML = array;
  console.log("username: ", para)
  return array;
}

// function to generate randomized password
const getPassword = (res) => {
  let password = randomizeWords(res)
  password = password.charAt(0).toUpperCase() + password.slice(1)
  let specialChar = '!?=#*$@+-.';
  const index = Math.floor(Math.random() * specialChar.length)
  specialChar = specialChar[index]
  password = password + specialChar
  let para = document.getElementById("password");
  para.innerHTML = password;
  console.log("password: ", password)
  // let password = getUserName(res);
  // // take word and make first letter to uppercase
  // password.charAt(0).toUpperCase() + password.slice(1)
  // let specialChar = '!?=#*$@+-.';
  // const index = Math.floor(Math.random() * specialChar.length)
  // // get random specialChar
  // specialChar = specialChar[index]
  // // add specialChar to new password
  // password = password + specialChar
  // // if password is less than 8 characters, rerun function
  // if (password.length < 8) {
  //   getPassword()
  // } else {
  //   console.log("password: ", password)
  //   return password;
  // }
}

const randomizeWords=(res)=>{
  // get random array from API results (API results return different arrays)
  const randomItem = res[Math.floor(Math.random() * res.length)];
  // turn words in the sentence to separate strings in an array
  const randomItemtoString = randomItem.split(" ");
  // first word: get random word in the array
  const randomWord = randomItemtoString[Math.floor(Math.random() * randomItemtoString.length)]
  // second word: get second random word in array
  const secondWord = randomItemtoString[Math.floor(Math.random() * randomItemtoString.length)]
  // generate a random number up to 1000
  const randomNum = Math.floor(Math.random() * 1000)
  // combine first word, second word, and random number to create random username
  let password = randomWord + secondWord + randomNum;
  password.replace(/.,/, "");
  return password
}


runRequest();
var config = {
  apiKey: "AIzaSyDyr5ZdZEHyHb5bofD0TZdO_fiU49MxO-0",
  authDomain: "throwaway-39c5b.firebaseapp.com",
  databaseURL: "https://throwaway-39c5b.firebaseio.com",
  projectId: "throwaway-39c5b",
  storageBucket: "",
  messagingSenderId: "489478107476"
};
firebase.initializeApp(config);

signIn();

function runRequest() {
  return axios.get(`https://baconipsum.com/api/?type=all-meat&sentences=10&start-with-lorem=1`)
  .then((result) => {
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

function saveAccount(userAccount){
  document.getElementById("save").addEventListener("click", function(e){
    e.preventDefault();
  const username = document.getElementById("username").innerHTML;
  const password = document.getElementById("password").innerHTML;
    const throwawayDetails={
      username,
      password
    }
    const dbRef = firebase.database().ref(`user/${userAccount}/`);
    dbRef.push(throwawayDetails)
  })
};

function displayFav(userAccount) {
  const dbRef = firebase.database().ref(`user/${userAccount}/`).limitToLast(5);
  dbRef.on("value", (firebaseData) => {
    document.getElementById("displayUsername").innerHTML = "";
    firebaseData.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      document.getElementById("displayUsername").innerHTML +=
        `<div class="account-list">
          <p>Username: 
            <span>
              ${childData["username"]}
            </span>
          </p> 
          <p>Password: 
            <span>
              ${childData["password"]}
            </span>
          </p>
        </div>`
      ;
    });
  });
}


// when user opens saved accounts aside, turn label colour orange
// else, leave it white
document.getElementById('label').onclick = function () {
  this.classList.toggle('colored');
}


// authentication
document.getElementById("create-user").addEventListener("click", function(e){
  e.preventDefault();
  const newUserEmail = document.getElementById("email").value;
  const newUserPassword = document.getElementById("create-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  if (newUserPassword === confirmPassword) {
  firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword)
  .then(function(){
    const user = firebase.auth().currentUser["uid"];
    saveAccount(user)
    displayFav(user)
    allowSave();
    toggleDisplay();
  })
  .catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  })}
})

// sign in
function signIn(){
  document.getElementById("login").addEventListener("click", function (e) {
    e.preventDefault();
    const currentUserEmail = document.getElementById("current-email").value;
    const currentUserPassword = document.getElementById("current-password").value;
    firebase.auth().signInWithEmailAndPassword(currentUserEmail, currentUserPassword)
    .then(function () {
      const user = firebase.auth().currentUser["uid"];
      saveAccount(user)
      displayFav(user)
      allowSave();
      toggleDisplay();
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  })
};
// signIn();

// function to show user features upon being logged in or signed up
function allowSave(){
  const saveAccount = document.getElementById("save");
  const savedAccountLabel = document.getElementById("label");
  saveAccount.style.display = "block";
  savedAccountLabel.style.display = "block";
};

function disableSave() {
  const saveAccount = document.getElementById("save");
  const savedAccountLabel = document.getElementById("label");
  saveAccount.style.display = "none";
  savedAccountLabel.style.display = "none";
  const username = document.getElementById("username").innerHTML = "";
  const password = document.getElementById("password").innerHTML = "";
};

// user can use the webpage without account
// if user wants added features, must sign in or sign up
// create button that allows users to sign in or up

function toggleLogin(){
  document.getElementById('user-account').onclick = function () {
    document.querySelector('.authentication').classList.toggle('showMe');
  };
};
toggleLogin();

const toggleDisplay = ()=>{
  document.querySelector('.authentication').classList.toggle('showMe');
};

const signOut=()=>{
  document.getElementById("sign-out").addEventListener("click", function(){
    firebase.auth().signOut();
    disableSave();
  });
}
signOut();
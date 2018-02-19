module.exports = function getPassword(){
    let password = "helloWorld";
    let specialChar = '!?=#*$@+-.';
    const index = Math.floor(Math.random() * specialChar.length);
    specialChar = specialChar[index];
    password = password + specialChar;
    if (password.length < 8) {
        getPassword();
    } else {
        return password
    }
}


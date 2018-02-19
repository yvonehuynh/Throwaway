module.exports = function getUserName(res){
    let array = res;
    array = array.replace(/,/, "");
    return array;
}
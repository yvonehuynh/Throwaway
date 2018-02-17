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
    var randomItem = res[Math.floor(Math.random() * res.length)];
    const randomItemtoString = randomItem.split(" ");
    const randomWord = randomItemtoString[Math.floor(Math.random() * randomItemtoString.length)]
    console.log(randomWord)
  })
    .catch((error) => {
      swal("Oops!", "This is not a levidrome as one of the words in not valid.", "error");
    });
}

runRequest();

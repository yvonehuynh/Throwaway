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
      reqUrl: `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/bomb/synonyms;antonyms`,
      proxyHeaders: {
        'header_params': 'value',
        "Accept": "application/json",
        "app_id": "8ec64674",
        "app_key": "b5a5e3f12d46fc718b916e1aaa1c3509"
      },
      xmlToJSON: false
    }
  }).then((result) => {
       const synonym = result.data.results.map(res=>{
         return res.lexicalEntries.map(secondResult=>{
           return secondResult.entries.map(thirdResult=>{
               return thirdResult.senses.map(fourthRes=>{
                 return fourthRes.synonyms.map(fifthRes=>{
                  turnArray(fifthRes.id)
                  return fifthRes.id;
              })
            })
          })
        })
      });  
  })
    .catch((error) => {
      swal("Oops!", "This is not a levidrome as one of the words in not valid.", "error");
    });
}
const arrays = [];
function turnArray(list) {
  arrays.push(list)
  console.log(arrays)
}

runRequest();

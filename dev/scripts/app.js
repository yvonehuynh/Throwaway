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
      let hello = result.data.results.map(res=>{
        res.lexicalEntries.map(res=>{
          res.entries.map(res=>{
            res.senses.map(res=>{
              res.synonyms.map(res=>{
                return res.id;
              })
            })
          })
        })
      });
      console.log(hello)
// return res
//     });
//     let hello = result.data.results[0].lexicalEntries[0].entries[0].senses[0].synonyms.map(res => {
// return res
//     });
//     hello = hello.map(res=>{
//       return res.id
//     })

//     for (let value in hello) {
//       console.log(hello[value])
//     }

    return result;
  })
    .catch((error) => {
      swal("Oops!", "This is not a levidrome as one of the words in not valid.", "error");
    });
}

runRequest();
import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import Qs from 'qs';
import Inputs from "./inputs";

class App extends React.Component {
  constructor(){
    super();
    this.searchBooze = this.searchBooze.bind(this)
  }
  searchBooze(e){
    e.preventDefault();
    const booze = document.getElementById("booze-input").value;
    console.log(booze);
    axios({
      method: 'GET',
      url: 'https://proxy.hackeryou.com',
      dataResponse: 'json',
      paramsSerializer: function (params) {
        return Qs.stringify(params, { arrayFormat: 'brackets' })
      },
      params: {
        reqUrl: 'http://lcboapi.com/products?access_key=MDoxNmMwYzI1YS1mNjRmLTExZTctYmE5Ni1mZjJjMWViODQ2Njg6QWtxc1ltNGVZUE9zTVhIZjg3ckR0ZFNJYUJVUndiWW4xR1BD',
        params: {
          q: `${booze}`
        },
        proxyHeaders: {
          'header_params': 'value'
        },
        xmlToJSON: false
      }
    }).then(res => {
      console.log(res)
    }); 
  }
    render() {
      return (
        <div>
          <Inputs search={this.searchBooze}/>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

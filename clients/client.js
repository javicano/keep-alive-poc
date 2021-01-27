const axios = require('axios');
const http = require('http');

const NUMBER_OF_REQUEST = 3;

const config1 = {
  baseURL: 'http://localhost:3000/resource'
};

const config2 = {
  baseURL: 'http://localhost:3000/resource',
  httpAgent: new http.Agent({ 
    keepAlive: false,
    maxSockets: 20
  })
};

const config3 = {
  baseURL: 'http://localhost:3000/resource',
  httpAgent: new http.Agent({ 
    keepAlive: true,
    maxSockets: 20,
    keepAliveMsecs: 10000
  })
};


const axiosInstance = axios.create(config1);

let count = 0;

function printResponseInfo(response) {
  console.log(`Http Status:: ${response.status}`);
  if (response.headers['connection']) {
    console.log(`Header:: connection: ${response.headers.connection}`);
  }
  console.log(``);
}

function request() {
  console.log(`${++count} - making a request`);
  
  //console.time();
  axiosInstance.get(`/${count}`).then(response => {
    console.log(`Total Time Request ${count}:`);
    //console.timeEnd();
    printResponseInfo(response);
  }).catch(err => {
    console.error(`problem with request: ${err.message}`);
  });
};


var id = setInterval(function(){ 
  request();
  if (count === NUMBER_OF_REQUEST) {
    clearInterval(id);
  }
}, 1000);

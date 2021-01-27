const express = require('express');
const shortid = require('shortid');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/resource', (req, res) => {
  console.log({
      host: req.headers.host,
      connection: req.headers.connection
  });
  setTimeout(()=>res.send('Hello World!'), 10000);
})

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})

//This event is emitted when a new TCP stream is established
server.on('connection', function (socket) {
    
    console.log('');
    socket.id = shortid.generate();
    console.log("A new connection was made by a client." + ` SOCKET ${ socket.id }`);
    
    socket.on('end', function() { 
        console.log(`SOCKET ${ socket.id } END: other end of the socket sends a FIN packet`);
    });

    socket.on('timeout', function() { 
        console.log(`SOCKET ${ socket.id } TIMEOUT`);
    });

    socket.on('error', function(error) { 
        console.log(`SOCKET ${ socket.id } ERROR: ` + JSON.stringify(error));
    });

    socket.on('close', function(had_error) { 
        console.log(`SOCKET ${ socket.id } CLOSED. IT WAS ERROR: ` + had_error);
    });
});
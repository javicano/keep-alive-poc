const express = require('express');
const shortid = require('shortid');

const app = express();
const port = 3000;

/**
 * Configuration 
 * keepAliveTimeout: 5 seg by default
 * */
keepAliveTimeout = 10 * 1000;



app.get('/resource/:resourceId', (req, res) => {
  
  console.log(`Request Headers: ${JSON.stringify({
      host: req.headers.host,
      connection: req.headers.connection
  })}`);

  
  res.send(`Response for request ${req.params.resourceId}`);
})

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
})
server.keepAliveTimeout = keepAliveTimeout;



// Emitted when a new TCP connection is made. socket is an instance of net.Socket
server.on('connection', function (socket) {
    
    socket.id = shortid.generate();
    console.log(`SOCKET ${ socket.id } CREATED: A new connection was made by a client => Remote Address: ${socket.remoteAddress}, Remote Family: ${socket.remoteFamily}, Remote Port: ${socket.remotePort}`);

    socket.on('end', () => { 
        console.log(`SOCKET ${ socket.id } END: The client sent a FIN packet to close the connection`);
    });

    socket.on('timeout', () => { 
        console.log(`SOCKET ${ socket.id } TIMEOUT: Server will close the connection after ${keepAliveTimeout/1000} seg`);
    });

    socket.on('error', (error) => { 
        console.log(`SOCKET ${ socket.id } ERROR: ` + JSON.stringify(error));
    });

    socket.on('close', (had_error) => { 
        console.log(`SOCKET ${ socket.id } CLOSED: Server close the connection. With error? ` + had_error);
    });
});
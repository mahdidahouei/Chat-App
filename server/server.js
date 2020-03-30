const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = SocketIO(server);

app.use(express.static(publicPath));

io.on("connection", function(socket){
    console.log('a new user just connected.');
    socket.on('disconnect', function(){
        console.log('User disconnected.');
        
    });
});

server.listen(3000, function(){
    console.log(`Server is up on port ${port}`);
});
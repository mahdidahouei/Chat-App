const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);    
let io = SocketIO(server);
app.use(express.static(publicPath));

io.on("connection", function(socket){
    console.log('a new user just connected.');

    socket.emit('newMessage',generateMessage('Admin','welcome to the chat'));
    
    socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('createMessage', function(message,callback){
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text)); 
        callback('This is server');
    });

    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage', generateLocationMessage("Admin", coords.lat, coords.lng));
    });

    socket.on('disconnect', function(){
        console.log('User disconnected.');
    });

});

server.listen(port, function(){
    console.log(`Server is up on port ${port}`);
});
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

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'welcome to the chat',
    })
    
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime(),
    });

    socket.on('disconnect', function(){
        console.log('User disconnected.');
        
    });

    socket.on('createMessage', function(message){
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime(),
        }); 

    })
});

server.listen(port, function(){
    console.log(`Server is up on port ${port}`);
});
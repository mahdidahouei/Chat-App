const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/isRealString')
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);    
let io = SocketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on("connection", function(socket){
    console.log('a new user just connected.');

    socket.on('join', (params,callback) => {

        if(!isRealString(params.name) || !isRealString(params.room))
            return callback('Name and room are required!');

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        let user = users.getUserById(socket.id);

        io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

        socket.emit('newMessage',generateMessage('Admin', `welcome to ${params.room}`));
    
        socket.to(user.room).broadcast.emit('newMessage', generateMessage('Admin',`${user.name} joined`));
    
        callback();
    });

    socket.on('createMessage', function(message,callback){
        let user = users.getUserById(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text)); 
        }

        callback('This is server');
    });

    socket.on('createLocationMessage',function(coords){
        let user = users.getUserById(socket.id);
        if(user) io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
    });

    socket.on('disconnect', function(){
        let user = users.removeUser(socket.id);

        if(user){
            io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has fucking left!`));
        }
    });

});

server.listen(port, function(){
    console.log(`Server is up on port ${port}`);
});
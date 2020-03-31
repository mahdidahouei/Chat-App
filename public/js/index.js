let socket = io();

socket.on('connect', function(){
    console.log('Connected to server.');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server.');
});

socket.on('newMessage', function(message){
    let li = document.createElement('li');
    li.innerText = `${message.from}: ${message.text}`;
    document.querySelector('body').appendChild(li);
});

socket.on('newLocationMessage', function(message){
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('target','_blank');
    a.setAttribute('href',message.url);
    a.innerText = 'My current location';
    li.appendChild(a);
    document.querySelector('body').appendChild(li);
});

document.querySelector('#submit-btn')
    .addEventListener('click',function(e){
        e.preventDefault();
        socket.emit('createMessage',{
            from: "User",
            text: document.querySelector('input[name="message"]').value,
        }, function(message){

        });
});

document.querySelector('#send-location-btn')
    .addEventListener('click',function(e){
        if(!navigator.geolocation) return alert('Geolocation is not supported by your browser!');
        navigator.geolocation.getCurrentPosition(function(position){
            socket.emit('createLocationMessage',{
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        },function(){
            alert('Unable to fetch location!');
        });
});
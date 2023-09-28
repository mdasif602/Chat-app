const socket = io('https://server-chat-4kn5.onrender.com',{transports:["websocket"]});
// const socket = io('http://localhost:8000',{transports:["websocket"]});

// const socket = io('http://localhost:8000');


// Get DOM elements in respective   Js variables    
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
// Audio that will play on receiving messages
var audio = new Audio('sound.mp3');


// Function which will append event info to the container
const append = (message, position)=>{
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if(position == 'left'){
        audio.play();
     }
    

}

// If form gets submiited send the info to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

// Ask new user for name and let the server know
const names = prompt("Enter your name to join");
socket.emit('new-user-joined', names)

// If new user joined receive name from the server
socket.on('user-joined', name =>{
       append(`${name}: joined the chat`, 'right')
})

// If server sends a message receive it
socket.on('receive', data =>{
       append(`${data.name}: ${data.message}`, 'left')
    })

// If a server leaves the chat append the info
socket.on('leave', data =>{
    append(`${data}: left the chart`, 'right')
})
    



















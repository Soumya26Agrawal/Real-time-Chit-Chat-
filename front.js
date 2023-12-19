
document.addEventListener('DOMContentLoaded', () => {
const socket= io( 'http://localhost:8000')

const form= document.getElementById('form')
const input= document.getElementById('inputField')
const chatbox= document.querySelector('.chatbox')

var audio= new Audio('tong.mp3')

const append= (message,position)=>
{
   const element = document.createElement('div')
   element.innerText=message;
   element.classList.add('message')
   element.classList.add(position)
   chatbox.append(element)
   if (position=='left')
   {
    audio.play()
   }
}

const identity= prompt("Enter your name to join Talk Room")
socket.emit('new-user-entry', identity  );


socket.on('user-entry',name=>
{
   append(`${name} joined Chit-Chat`, 'left' )
})

form.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const message=input.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message)
    input.value='';
     
})

socket.on('receive', object=>{
    append(`${object.name}: ${object.message}`,'left')
}
)

socket.on('left', identity=>{
    append(`${identity} left the chat`,'left')
})

});


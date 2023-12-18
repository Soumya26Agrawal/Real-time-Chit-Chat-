 const socket= io( 'http://localhost:8000')

 const form= document.getElementById('form')
 const input= document.getElementById('inputField')
 const chatbox= document.querySelector('.chatbox')

 const append= (message,position)=>
 {
    const element = document.createElement('div')
    element.innerText=message;
    element.classList.add('message')
    element.classList.add(position)
    chatbox.append(element)


 }

 
 const identity= prompt("Enter your name to join Talk Room")
 socket.emit('new-user-entry', identity  );
 

 socket.on('user-entry',name=>
 {
    append('${name} joined Talk Room', 'left' )
 })


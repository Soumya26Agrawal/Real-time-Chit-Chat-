const io= require('socket.io')({
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    },
    transports: ['websocket', 'polling'],
  });
const users = {};
io.on("connection", socket=>
{
    socket.on('new-user-entry',name=>
    {
        console.log("Connection established")
        users[socket.id]=name;
        socket.broadcast.emit('user-entry',name);
    })
    socket.on('send',message=>
{
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
})

socket.on('disconnect',message=>{
  socket.broadcast.emit('left',users[socket.id])
  delete users[socket.id]
})
});
io.listen(8000, () => {
    console.log('Server is running on port 8000');
  });

 

 
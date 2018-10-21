const path =require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');


const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
console.log(publicPath);
var app=express();
var server=http.createServer(app);
//get web socket server for emit and listen events 
var io=socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
console.log("new user connected");

/*socket.emit('newMessage',{
    from:'shivam',
    text:'This is new message',
    createdAt:1123
});*/

socket.on('createMessage',(message)=>{
    console.log('Created message',message);
    io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
    });
});



socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
})
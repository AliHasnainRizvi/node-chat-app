const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
var {generateMessage, generateLocationMessage} = require ('./utils/message'    )
const publicPath = path.join(__dirname,
    '../public'
)
const port = process.env.PORT || 3000
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))
io.on('connection', (socket) => {
    console.warn("New Connection")

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app!'));
     socket.broadcast.emit('newMessage',generateMessage("Admin", "New user joined"))
       
    socket.on('createMessage', (message, callback)=> {
        
        
    
    io.emit('newMessage',generateMessage(message.from, message.text))
    callback("this is from sever")
        })
    socket.on('createLocationMessage', (coords)=> {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat,coords.long))
    })
    socket.on('disconnect', () => {
        console.log("User was disconneccted!")
    })
})

server.listen(port, () => {
    console.log(`at port  ${port} `)
})
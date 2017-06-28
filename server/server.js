const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
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

    /*socket.emit('newEmail', {
        from: 'ali@google.com',
        text: "Supp?",
        createdAt: 124
    });*/
    socket.on('createMessage', (message)=> {
        console.log(message)
        io.emit('newMessage',{
            from : message.from,
            text : message.text,
            createAt : new Date().getTime()
        })
    })
   /* socket.emit('newMessage', {
        from : "sabika",
        text : "hello from server!",
        createAt : 123123
    })*/
    /*socket.on('createEmail', (email) => {
        console.log(email)
    })*/
    socket.on('disconnect', () => {
        console.log("User was disconneccted!")
    })
})
server.listen(port, () => {
    console.log(`at port  ${port} `)
})
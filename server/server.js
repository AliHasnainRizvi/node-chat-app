const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const publicPath = path.join(__dirname,
'../public'
)
const port = process.env.PORT || 3003
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))
io.on('connection', (socket)=> {
    console.warn("New Connection")
    socket.on('disconnect', ()=> {
        console.log("User was disconneccted!")
    })
})
server.listen(port, ()=> {
    console.log(`at port  ${port} `)
})
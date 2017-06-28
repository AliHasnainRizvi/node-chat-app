var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')

   /* socket.emit('createEmail', {
        to: 'sabik@google.com',
        text: "hey this is Ali"
    })*/
    socket.emit('createMessage', {
        from: 'Hasnain',
        text: 'Hello from client!'
    })
})
socket.on('disconnect', function () {
    console.log("Unable to connect to server")
})
/*socket.on("newEmail", function (email) {
    console.log("new Email!", email)
})*/

socket.on('newMessage', function(message){
    console.log(`New message : `, message)
})


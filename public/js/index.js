var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')

})
socket.on('disconnect', function () {
    console.log("Unable to connect to server")
})


socket.on('newMessage', function(message){
    console.log(`New message : `, message)
    var li = $('<li></li>')
    li.text(`${message.from}: ${message.text}`)
    $("#messages").append(li)
})

socket.on('newLocationMessage', function (message) { 
    var li = $('<li></li>')
    var  a = $('<a target="_blank">My Current Location</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a)
    $("#messages").append(li)
 })

$('#message-form').on('submit', function (e) {
    e.preventDefault()
    socket.emit('createMessage', {
    from : 'Someone',
    text : $('[name=message]').val()
}, function(data) {
    console.log(data)
})
})


var locationButton = $('#send-location')
locationButton.on('click', function () {
    if(!navigator.geolocation) {
        return alert('Gelocation not supported in your browser')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position)
        socket.emit('createLocationMessage', {
          lat : position.coords.latitude,
          long : position.coords.longitude

        })
    }, function (err) {
          alert('Unable to fetch location.')
        })
})

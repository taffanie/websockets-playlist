let express = require('express');
let socket = require('socket.io');

// App setup 
let app = express();
let server = app.listen(4000, function () {
    console.log('listening to requests on port 4000')
})

// Static files served in browser
app.use(express.static('public'))

// Socket setup 
let io = socket(server);

io.on('connection', function (socket) {
    console.log('made socket connection', socket.id)

    socket.on('chat', function (data) {
        io.emit('chat', data);
    })

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data)
    })
})
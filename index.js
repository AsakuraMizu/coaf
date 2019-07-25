var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('static'));
app.use(express.static('node_modules'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket){
    socket.on('update', function(msg){
        console.log(msg);
    });
    socket.on('join', function(msg){
        console.log(msg);
        socket.emit('loged');
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

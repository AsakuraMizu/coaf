var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/static'));
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/static/index.html');
});

var User = function() {
    this.socket = undefined;
    this.room = undefined;
};

var Room = function() {
    this.name = undefined;
    this.user = [undefined, undefined];
}

var server = new Map();
var room_limit = 10;

io.on('connection', function(socket) {
    var user = new User();
    user.socket = socket;
    socket.on('join', function(name) {
        if (server.has(name)) {
            var room = server.get(name);
            if (room.user[0] !== undefined && room.user[1] !== undefined) {
                socket.emit('fail', '房间已满！');
                return;
            } else if (room.user[0] === undefined) {
                user.room = room;
                room.user[0] = user;
                room.user[1].socket.emit('refresh');
            } else if (room.user[1] === undefined) {
                user.room = room;
                room.user[1] = user;
                room.user[0].socket.emit('refresh');
            }
        } else {
            if (room_limit == 0) {
                socket.emit('fail', '房间数已达服务器上限！');
                return;
            }
            var room = new Room;
            user.room = room;
            room.user[0] = user;
            server.set(name, room);
            room_limit--;
        }
        user.room.name = name;
        socket.emit('loged');
    });
    socket.on('update', function(content) {
        if (user === user.room.user[0]) {
            if (user.room.user[1] !== undefined) {
                user.room.user[1].socket.emit('update', content);
            }
        } else {
            if (user.room.user[0] !== undefined) {
                user.room.user[0].socket.emit('update', content);
            }
        }
    });
    socket.on('disconnect', function() {
        if (user.room === undefined) { delete user; return; }
        if (user === user.room.user[0]) {
            user.room.user[0] = undefined;
            if (user.room.user[1] === undefined) {
                server.delete(user.room.name);
                delete user.room;
                room_limit++;
            } else {
                user.room.user[1].socket.emit('update', '');
            }
        } else {
            user.room.user[1] = undefined;
            if (user.room.user[0] === undefined) {
                server.delete(user.room.name);
                delete user.room;
                room_limit++;
            } else {
                user.room.user[0].socket.emit('update', '');
            }
        }
        delete user;
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

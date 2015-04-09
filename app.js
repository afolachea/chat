var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var cool = require('cool-ascii-faces');

server.listen(process.env.PORT || 3000);

app.get('/', function(req, res){
	res.send(cool());
});

app.get('/chat/', function(req, res){
	res.sendFile(__dirname + '/chat.html');
});

io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		io.sockets.emit('new message', data);
	})
})
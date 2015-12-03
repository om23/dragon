var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);

		if(msg=="hi"){
			io.emit('chat message', 'D.O.D.: Hi! How are you? Jk I do not really care');
			console.log("user sent hi");
			io.emit('chat message', 'Now try: Move your tail');

			console.log(`ls`);

		}



	});
})

http.listen(3000, function(){
	console.log('listening on *:3000');
})
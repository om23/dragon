(function() {
 var childProcess = require("child_process");
 var oldSpawn = childProcess.spawn;
 function mySpawn() {
  console.log('spawn called');
  console.log(arguments);
  var result = oldSpawn.apply(this, arguments);
  return result;
 }
 childProcess.spawn = mySpawn;
})();

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var spawn = require('child_process').spawn;
var _ = require('underscore'); //for utility goodness


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);

		if(msg=="hi"){
			io.emit('chat message', 'D.O.D.:  Hi! How are you? Jk I do not really care');
			console.log("user sent hi to me");
			io.emit('chat message', 'Now try, "fly"');

		} else if (msg == "fly") {
			io.emit('chat message', 'D.O.D.:  I am trying my best!');
			console.log("flapping my wings...");


			var deploySh = spawn('sh', [ 'testServo' ], {
				cwd: process.env.HOME + '/dragon/socketTest/',
				env:_.extend(process.env, { PATH: process.env.PATH + ':/usr/local/bin'})
			});
		}



	});
})

http.listen(3000, function(){
	console.log('listening on *:3000');
})

let clients=0;

var io = require('socket.io')({
	transports: ['websocket'],
});

io.attach(4567);

console.log('server started');

io.on('connection', function(socket){
	clients++;
	console.log('client connected');
	console.log('client num:'+clients);
	
	//socket.emit('boop');
	//socket.broadcast.emit('boop');
	//io.sockets.emit('boop') ;
	//socket.on('message', function(message, callback) {});
	
	socket.on('message', function(msg){
        console.log('received a message:'+msg.content);
        socket.broadcast.emit('message',msg);
    });
    
    socket.on('messageall', function(msg){
        console.log('received a message:'+msg.content);
        io.sockets.emit('messageall',msg) ;
    });
    
	socket.on('disconnect', function () {
		clients--;
        console.log('client disconnected');
        console.log('client num:'+clients);
    });
});
 

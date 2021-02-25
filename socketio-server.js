//code by kaifazhang
let clients=0;

var app = require('express')();  
var http = require('http').Server(app);  
var io = require('socket.io')(http);  
   
http.listen(4567, function(){  
    console.log('server started');  
}); 

io.on('connection', function(socket){
	clients++;
	console.log('client connected');
	console.log('client num:'+clients);
	
	//socket.emit('message');
	//socket.broadcast.emit('message');
	//io.sockets.emit('message') ;
	//socket.on('message', function(message, callback) {});
	
	//sent to other clients not including the sender.
	socket.on('message', function(msg){
        	console.log('received a message');
        	socket.broadcast.emit('message',msg);
    	});
	
	//sent to all clients, including message senders.
    	socket.on('messageall', function(msg){
        	console.log('received a message');
        	io.sockets.emit('messageall',msg) ;
    	});
    
	socket.on('disconnect', function () {
		clients--;
        	console.log('client disconnected');
        	console.log('client num:'+clients);
    	});
});
 

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
	
	//socket.emit('boop');
	//socket.broadcast.emit('boop');
	//io.sockets.emit('boop') ;
	//socket.on('message', function(message, callback) {});
	
	//for json format strings, sent to other clients not including the sender.
	socket.on('message', function(msg){
        	console.log('received a message:'+msg.content);
        	socket.broadcast.emit('message',msg);
    	});
    	//for byte array, sent to other clients not including the sender.
	socket.on('bytes', function(msg){
        	console.log('received a bytes');
        	socket.broadcast.emit('bytes',msg);
    	});
	
	//for json format strings, sent to all clients, including message senders.
    	socket.on('messageall', function(msg){
        	console.log('received a message:'+msg.content);
        	io.sockets.emit('messageall',msg) ;
    	});
	
	//for byte array, sent to all clients, including message senders.
	socket.on('bytesall', function(msg){
        	console.log('received a bytes');
        	io.sockets.emit('bytesall',msg) ;
    	});
    
	socket.on('disconnect', function () {
		clients--;
        console.log('client disconnected');
        console.log('client num:'+clients);
    });
});
 

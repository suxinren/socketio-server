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
	
	//socket.emit('boop');//向建立该连接的客户端广播
	//socket.broadcast.emit('boop');//向除了自己之外的其它客户端广播
	//io.sockets.emit('boop') ;//向所有客户端广播，等于以上两个之和
	//socket.on('message', function(message, callback) {});
	
	socket.on('message', function(msg){  //接收socket连接消息的时候触发
        console.log('received a message:'+msg.content);
        socket.broadcast.emit('message',msg);//向除了消息发送者之外的其他所有客户端广播
    });
    
    socket.on('messageall', function(msg){  //接收socket连接消息的时候触发
        console.log('received a message:'+msg.content);
        io.sockets.emit('messageall',msg) ;//向所有客户端广播，包括消息发送者
    });
    
	socket.on('disconnect', function () {
		clients--;
        console.log('client disconnected');
        console.log('client num:'+clients);
    });
});
 

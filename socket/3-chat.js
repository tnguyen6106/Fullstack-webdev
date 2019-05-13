'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

const connectedUsers = [];
//const disconnectedUsers = [];
io.on('connection', function(objectSocket) {
	// send everyone the 'clients' event, containing an array with the ids of the connected clients - example: { 'strClients':['GxwYr9Uz...','9T1P4pUQ...'] }
	// send everyone the 'message' event, containing a message that a new client connected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... connected' }
	connectedUsers.push(objectSocket.id);
	io.sockets.emit('clients', {
		'strClients': connectedUsers
	})
	io.sockets.emit('message', {
		'strFrom': 'server',
		'strTo': 'everyone',
		'strMessage': objectSocket.id + ' connected'
	})
	objectSocket.on('message', function(objectData) {
		// if the message should be received by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin
		//console.log(objectData.strTo === 'everyone');
		if(objectData.strTo === 'everyone') {
			io.sockets.emit('message', {
				'strFrom': objectSocket.id,
				'strTo': 'everyone',
				'strMessage': objectData.strMessage
			})
		} else {
			console.log(objectData.strTo);
			var id = objectData.strTo;	
			io.to(objectSocket.id).emit('message', {
				'strFrom': objectSocket.id,
				'strTo': objectData.strTo,
				'strMessage': objectData.strMessage	
			});
			io.to(id).emit('message', {
				'strFrom': objectSocket.id,
				'strTo': objectData.strTo,
				'strMessage': objectData.strMessage	
			});
		}
	});

	objectSocket.on('disconnect', function() {
		// send everyone the 'clients' event, containing an array of the connected clients - example: { 'strClients':['GxwYr9Uz...'] }
		var indexUser = connectedUsers.indexOf(objectSocket.id);
		/*for(var i = 0; i < connectedUsers.length; ++i) {
			if(connectedUsers[i] === objectSocket.id) {
				indexUser = i;
				break;
			}
		}*/
		if(indexUser > -1) {
			connectedUsers.splice(indexUser, 1);
		}
		console.log(connectedUsers);
		io.sockets.emit('clients', {
			'strClients': connectedUsers
		})
		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'strFrom':'server', 'strTo':'everyone', 'strMessage':'9T1P4pUQ... disconnected' }
		io.sockets.emit('message', {
			'strFrom': 'server',
			'strTo': 'everyone',
			'strMessage': objectSocket.id + ' disconnected'
		})
	});
});

console.log('go ahead and open "http://localhost:8080/3-chat.html" in your browser');
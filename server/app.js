/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);


// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

var socketIO = require('socket.io');
var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {
    socket.on('add', function(data) {
        console.log(data);
        socket.broadcast.emit('receive', data);
    });

    socket.on('point', function (data) {
        console.log(data);
        socket.broadcast.broadcast.emit('point', data);
    });
});

// Expose app
exports = module.exports = app;

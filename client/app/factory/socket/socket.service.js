'use strict';

angular.module('teamhApp')
.factory('socket', function (socketFactory) {
    //var myIOSocket = io.connect('http://localhost:9000');

    var mySocket = socketFactory();
    mySocket.forward('receive');   
           
    return mySocket;
});

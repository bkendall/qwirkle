var React = require('react');
var Board = require('./components/board.react');

var socketClient = require('socket.io-client');

var host = 'localhost';
if (process.env.NODE_ENV === 'production') {
  host = 'qwirkle.me';
}
var socket = socketClient('ws://' + host + ':3001');

React.render(
  <Board
    width={20}
    height={20}
    socket={socket} />,
  document.getElementById('qwirkle')
);


var React = require('react');
var Board = require('./components/board.react');

var socket = new WebSocket('ws://104.131.155.240:3001');

React.render(
  <Board
    socket={socket}
    width={20}
    height={20} />,
  document.getElementById('qwirkle')
);


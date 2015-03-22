var React = require('react');
var Board = require('./components/board.react');

React.render(
  <Board
    width={20}
    height={20} />,
  document.getElementById('qwirkle')
);


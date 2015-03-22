var AppDispatcher = require('../dispatcher');
var constants = require('../constants');

var host = 'localhost';
if (process.env.NODE_ENV === 'production') {
  host = 'qwirkle.me';
}
var _socket = new WebSocket('ws://' + host + ':3001');
_socket.onmessage = function (m) {
  var d = JSON.parse(m.data);
  boardActions.playBox(d.row, d.column, d.color, true);
};

var boardActions = module.exports = {
  playBox: function (row, column, color, fromSocket) {
    AppDispatcher.dispatch({
      actionType: constants.BOARD_PLAY,
      row: row,
      column: column,
      color: color,
      fromSocket: !!fromSocket
    });
  },
  sendPlay: function (d) {
    _socket.send(d);
  }
};

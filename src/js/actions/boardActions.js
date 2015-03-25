var AppDispatcher = require('../dispatcher');
var constants = require('../constants');
var exists = require('101/exists');

var boardActions = module.exports = {
  playBox: function (row, column, color) {
    AppDispatcher.dispatch({
      actionType: exists(color) ? constants.SOCKET_PLAY : constants.BOARD_PLAY,
      row: row,
      column: column,
      color: color
    });
  }
};

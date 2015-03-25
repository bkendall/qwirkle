var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants');
var assign = require('object-assign');
var exists = require('101/exists');

var _width = 20;
var _height = 20;
var _length = _width * _height;
var i = 0;
var _board = Array(_length);
while (i < _length) { _board[i++] = 0; }
var _currentColor = 1;

function setBox(row, column, color) {
  _board[row * _height + column] = color;
}

var boardStore = module.exports = assign({}, EventEmitter.prototype, {
  getBoard: function () {
    return _board;
  },
  getCurrentColor: function () {
    return _currentColor;
  },
  emitPlay: function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(constants.PLAY_EVENT);
    this.emit.apply(this, args);
  },
  addPlayListener: function (callback) {
    this.on(constants.PLAY_EVENT, callback);
  },
  removePlayListener: function (callback) {
    this.removeListener(constants.PLAY_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case constants.SOCKET_PLAY:
      setBox(action.row, action.column, action.color);
      boardStore.emitPlay(false);
      return

    case constants.BOARD_PLAY:
      action.color = _currentColor;
      _currentColor = _currentColor * -1;
      setBox(action.row, action.column, action.color);
      boardStore.emitPlay(true, action);
      break;

    default:
  }
});

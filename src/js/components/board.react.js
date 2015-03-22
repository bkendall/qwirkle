var React = require('react');
var BoardBox = require('./boardBox.react');
var BoardStore = require('../stores/boardStore');
var BoardActions = require('../actions/boardActions');
var constants = require('../constants');
var exists = require('101/exists');

function getBoardState () {
  return {
    grid: BoardStore.getBoard(),
    currentColor: BoardStore.getCurrentColor()
  }
}

var BoardView = module.exports = React.createClass({
  getInitialState: function () {
    return getBoardState();
  },
  componentDidMount: function () {
    BoardStore.addPlayListener(this._onChange);
  },
  componentWillUnmount: function () {
    BoardStore.removePlayListener(this._onChange);
  },
  render: function () {
    var boxes = this.state.grid.map(function (color, i) {
      return <BoardBox
        color={color}
        row={Math.floor(i / this.props.height)}
        column={i % this.props.width}
        key={i}
      />;
    }, this);
    var style = {
      width: this.props.width * 40,
      height: this.props.height * 40
    };
    return (
      <div style={style} id="board">
        {boxes}
      </div>
    );
  },
  _onChange: function () {
    this.setState(getBoardState());
  }
});


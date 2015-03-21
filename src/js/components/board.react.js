var React = require('react');
var BoardBox = require('./boardBox.react');
var constants = require('../constants');
var exists = require('101/exists');

var BoardView = module.exports = React.createClass({
  getInitialState: function () {
    var i = 0;
    var size = this.props.width * this.props.height;
    var grid = Array(size);
    while (i < size) { grid[i++] = 0; }
    return {
      currentColor: 1,
      grid: grid
    };
  },
  componentDidMount: function () {
    this.props.socket.onopen = function () {
      this.props.socket.onmessage = function (m) {
        var data = JSON.parse(m.data);
        if (exists(data.row) && exists(data.col) && exists(data.color)) {
          this.playBox(data.row, data.col, data.color);
        }
      }.bind(this);
    }.bind(this);
  },
  playBox: function (row, col, color) {
    var sendPlay = !color;
    if (!color) {
      color = this.state.currentColor;
    }
    var grid = this.state.grid;
    grid[row * this.props.height + col] = color;
    this.setState({
      grid: grid,
      currentColor: color * -1
    });
    if (sendPlay) {
      this.props.socket.send(JSON.stringify({
        col: col,
        row: row,
        color: color
      }));
    }
  },
  render: function () {
    var boxes = this.state.grid.map(function (color, i) {
      return <BoardBox
        playBox={this.playBox}
        color={color}
        row={Math.floor(i / this.props.height)}
        col={i % this.props.width}
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
});


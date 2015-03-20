var GRID_SIZE = 40;

var BoardBox = React.createClass({
  generateClasses: function () {
    var classes = 'q_box ';
    if (this.props.color !== 0) {
      classes += (this.props.color === 1) ? 'black' : 'white';
    }
    return classes;
  },
  generateStyle: function () {
    return {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE
    };
  },
  handleClick: function () {
    if (this.props.color === 0) {
      this.props.playBox(this.props.row, this.props.col);
    }
  },
  render: function () {
    return (
      <div
        className={this.generateClasses()}
        style={this.generateStyle()}
        onClick={this.handleClick} >
      </div>
    )
  },
});

var BoardView = React.createClass({
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
      width: this.props.width * GRID_SIZE,
      height: this.props.height * GRID_SIZE,
    };
    return (
      <div style={style} id="board">
        {boxes}
      </div>
    );
  },
});

var socket = new WebSocket('ws://104.131.155.240:3001');

React.render(
  <BoardView 
    socket={socket}
    width={20}
    height={20} />,
  document.getElementById('qwirkle')
);

function exists (val) {
  return val !== undefined && val !== null;
}

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
    var grid = Array(this.props.width * this.props.height);
    for (var i = 0; i < grid.length; ++i) { grid[i] = 0; }
    return {
      currentColor: 1,
      grid: grid
    };
  },
  playBox: function (row, col) {
    var color = this.state.currentColor;
    var grid = this.state.grid;
    grid[row * this.props.height + col] = color;
    this.setState({
      grid: grid,
      currentColor: color * -1
    });
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

// var SwitchColorView = React.createClass({
//   handleClick: function (e) {
//     this.props.board.switchColor();
//   },
//   render: function () {
//     return (
//       <input
//         id="pass-btn"
//         type="button"
//         value="Change"
//         onClick={this.handleClick} />
//     );
//   },
// });

// var ContainerView = React.createClass({
//   getInitialState: function () {
//     return { 'board': this.props.board };
//   },
//   boardUpdate: function () {
//     console.log('onBoardUpdate');
//   },
//   render: function () {
//     return (
//       <div>
//         <SwitchColorView board={this.props.board} />
//         <BoardView board={this.props.board} />
//       </div>
//     )
//   },
// `});

React.render(
  <BoardView 
    width={20}
    height={20} />,
  document.getElementById('qwirkle')
);

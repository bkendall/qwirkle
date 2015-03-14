var GRID_SIZE = 40;

var BoardBox = React.createClass({
  getInitialState: function () {
    return {
      played: false,
      color: this.props.color
    };
  },
  generateClasses: function () {
    var classes = 'q_box ';
    if (this.state.color !== 0) {
      classes += (this.state.color === 1) ? 'black' : 'white';
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
    if (!this.state.played) {
      this.setState({
        color: this.props.playColor(),
        played: true
      });
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
    return { currentColor: 1 };
  },
  playColor: function () {
    var color = this.state.currentColor;
    this.setState({
      currentColor: color * -1
    });
    return color;
  },
  render: function () {
    var boxes = [];
    for (var i = 0; i < this.props.height; ++i) {
      for (var j = 0; j < this.props.width; ++j) {
        var k = (i*100).toString() + j.toString();
        boxes.push(<BoardBox
          playColor={this.playColor}
          color={0}
          row={i}
          col={j}
          key={k}
        />);
      }
    }
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

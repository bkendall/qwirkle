/** @jsx React.DOM */
var GRID_SIZE = 40;

var BoardBox = React.createClass({
  handleClick: function () {
    if (this.props.board.play(this.props.row, this.props.col)) {
      this.props.onPlay();
    }
  },
  render: function () {
    var style = {
      top: this.props.row * GRID_SIZE,
      left: this.props.col * GRID_SIZE
    };

    var classes = 'q_box ';
    if (this.props.color !== Board.EMPTY) {
      classes += (this.props.color === Board.BLACK) ? 'black' : 'white';
    }

    return (
      <div onClick={this.handleClick} className={classes} style={style}></div>
    )
  },
});

var BoardView = React.createClass({
  render: function () {
    var boxes = [];
    for (var i = 0; i < this.props.board.size; ++i) {
      for (var j = 0; j < this.props.board.size; ++j) {
        boxes.push(BoardBox({
          board: this.props.board,
          color: this.props.board.board[i][j],
          row: i,
          col: j,
          onPlay: this.props.onPlay
        }));
      }
    }
    var style = {
      width: this.props.board.size * GRID_SIZE,
      height: this.props.board.size * GRID_SIZE,
    };
    return <div style={style} id="board">{boxes}</div>;
  },
});

var SwitchColorView = React.createClass({
  handleClick: function (e) {
    this.props.board.switch_color();
  },
  render: function () {
    return (
      <input id="pass-btn" type="button" value="Change"
             onClick={this.handleClick} />
    )
  },
});

var ContainerView = React.createClass({
  getInitialState: function () {
    return { 'board': this.props.board };
  },
  onBoardUpdate: function () {
    this.setState({ 'board': this.props.board });
  },
  render: function () {
    return (
      <div>
        <SwitchColorView board={this.state.board} />
        <BoardView board={this.state.board}
                   onPlay={this.onBoardUpdate.bind(this)} />
      </div>
    )
  },
});

var board = new Board(20);
React.renderComponent(
  <ContainerView board={board} />,
  document.getElementById('qwirkle')
);

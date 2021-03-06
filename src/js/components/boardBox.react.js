var BoardActions = require('../actions/boardActions');
var React = require('react');

var BoardBox = module.exports = React.createClass({
  generateClasses: function () {
    var classes = 'q_box ';
    if (this.props.color !== 0) {
      classes += (this.props.color === 1) ? 'black' : 'white';
    }
    return classes;
  },
  generateStyle: function () {
    return {
      top: this.props.row * 40,
      left: this.props.column * 40
    };
  },
  handleClick: function () {
    if (!this.props.color) {
      BoardActions.playBox(this.props.row, this.props.column);
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


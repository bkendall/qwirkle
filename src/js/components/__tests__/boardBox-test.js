jest.dontMock('../boardBox.react');

describe('BoardBox', function () {
  it('should render a normal box with no color', function () {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var BoardBox = require('../boardBox.react');

    var box = TestUtils.renderIntoDocument(
      <BoardBox
        row='0'
        column='0'
        color='0' />
    );

    var div = TestUtils.findRenderedDOMComponentWithTag(box, 'div');
    console.log(div);
    expect(true).toEqual(false);
  });
});

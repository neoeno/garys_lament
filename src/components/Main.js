require('normalize.css');
require('styles/App.css');

import React from 'react';
import { connect } from 'react-redux';
import key from 'key';
import TileDisplayComponent from './TileDisplayComponent';
import movePlayer from '../actions/player/movePlayer';

class AppComponent extends React.Component {
  componentDidMount() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(evt) {
    if (evt.repeat) { return; }
    if (key.is(key.code.arrow.up, evt.which)) {
      this.props.dispatch(movePlayer({x: 0, y: -1}));
    } else if(key.is(key.code.arrow.right, evt.which)) {
      this.props.dispatch(movePlayer({x: 1, y: 0}));
    } else if(key.is(key.code.arrow.down, evt.which)) {
      this.props.dispatch(movePlayer({x: 0, y: 1}));
    } else if(key.is(key.code.arrow.left, evt.which)) {
      this.props.dispatch(movePlayer({x: -1, y: 0}));
    }
  }

  render() {
    return (
      <div className="index">
        <TileDisplayComponent player={this.props.player} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

function select(state) {
  return {
    player: state.player
  };
}


export default connect(select)(AppComponent);

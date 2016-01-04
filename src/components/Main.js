require('normalize.css');
require('styles/App.css');
require('styles/GameFrame.css');

import React from 'react';
import { connect } from 'react-redux';
import key from 'key';
import TileDisplayComponent from './TileDisplayComponent';
import TextDisplayComponent from './TextDisplayComponent';
import PlayerComponent from './PlayerComponent';
import move from '../actions/game/move';
import act from '../actions/game/act';
import actFinished from '../actions/game/actFinished';

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
      this.props.dispatch(move({x: 0, y: -1}));
    } else if (key.is(key.code.arrow.right, evt.which)) {
      this.props.dispatch(move({x: 1, y: 0}));
    } else if (key.is(key.code.arrow.down, evt.which)) {
      this.props.dispatch(move({x: 0, y: 1}));
    } else if (key.is(key.code.arrow.left, evt.which)) {
      this.props.dispatch(move({x: -1, y: 0}));
    } else if (key.is(key.code.special.space, evt.which) || key.is(key.code.special.enter, evt.which)) {
      this.props.dispatch(act());
    }
  }

  render() {
    return (
      <div className="game-frame__wrapper">
        <div className="game-frame">
          <TileDisplayComponent game={this.props.game} />
          <TextDisplayComponent game={this.props.game} onActFinished={() => {
            this.props.dispatch(actFinished());
          }} />
          <PlayerComponent game={this.props.game} />
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

function select(state) {
  return {
    game: state.game
  };
}


export default connect(select)(AppComponent);

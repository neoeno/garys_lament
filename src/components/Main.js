require('normalize.css');
require('styles/App.css');
require('styles/GameFrame.css');

import React from 'react';
import { connect } from 'react-redux';

import BackgroundDisplayComponent from './BackgroundDisplayComponent';
import PositionShiftComponent from './PositionShiftComponent';
import TextDisplayComponent from './TextDisplayComponent';
import PlayerComponent from './PlayerComponent';
import * as actions from '../actions/game';
import * as Game from '../lib/Game';

class AppComponent extends React.Component {
  getOpacity() {
    if (Game.activeState(this.props.game) == 'TELEPORTING') {
      return [
        1.00,
        0.75,0.75,0.75,0.75,0.75,0.75,
        0.50,0.50,0.50,0.50,0.50,0.50,
        0.25,0.25,0.25,0.25,0.25,0.25,
        0.00,0.00,0.00,0.00,0.00,0.00,
        0.25,0.25,0.25,0.25,0.25,0.25,
        0.50,0.50,0.50,0.50,0.50,0.50,
        0.75,0.75,0.75,0.75,0.75,0.75,
        1.00][this.props.game.gameStateTick];
    } else {
      return 1;
    }
  }

  render() {
    return (
      <div className="game-frame__wrapper">
        <div className="game-frame">
          <div style={{opacity: this.getOpacity()}}>
            <PositionShiftComponent game={this.props.game}>
              <BackgroundDisplayComponent game={this.props.game} />
            </PositionShiftComponent>
            <TextDisplayComponent game={this.props.game} onActFinished={() => {
              window.sequencer.dispatch(actions.act());
            }} />
            <PlayerComponent game={this.props.game} />
          </div>
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

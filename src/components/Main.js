require('normalize.css');
require('styles/App.css');
require('styles/GameFrame.css');

import React from 'react';
import { connect } from 'react-redux';
import TileDisplayComponent from './TileDisplayComponent';
import PositionShiftComponent from './PositionShiftComponent';
import TextDisplayComponent from './TextDisplayComponent';
import PlayerComponent from './PlayerComponent';
import act from '../actions/game/act';
import movementFinished from '../actions/game/movementFinished';

class AppComponent extends React.Component {
  render() {
    let gameFrameClass = {'FADE_OUT': 'is-fade-out', 'SHOW': ''}[this.props.game.screenTransitionState];
    return (
      <div className="game-frame__wrapper">
        <div className={`game-frame ${gameFrameClass}`}>
          <PositionShiftComponent game={this.props.game} onMovementFinished={() => {
            this.props.dispatch(movementFinished());
          }}>
            <TileDisplayComponent game={this.props.game} />
          </PositionShiftComponent>
          <TextDisplayComponent game={this.props.game} onActFinished={() => {
            this.props.dispatch(act());
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

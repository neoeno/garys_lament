require('normalize.css');
require('styles/App.css');
require('styles/GameFrame.css');

import React from 'react';
import { connect } from 'react-redux';

import scheduler from '../lib/scheduler';
import TileDisplayComponent from './TileDisplayComponent';
import PositionShiftComponent from './PositionShiftComponent';
import TextDisplayComponent from './TextDisplayComponent';
import PlayerComponent from './PlayerComponent';
import act from '../actions/game/act';
import movementFinished from '../actions/game/movementFinished';
import triggerMovement from '../actions/game/triggerMovement';

class AppComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.game.screenTransitionState == this.props.game.screenTransitionState) { return; }
    if (this.props.game.screenTransitionState === 'FADE_OUT') {
      scheduler
        .first(         () => this.refs.fadeOutTarget.style.opacity = 0.66)
        .wait(400).then(() => this.refs.fadeOutTarget.style.opacity = 0.33)
        .wait(400).then(() => this.refs.fadeOutTarget.style.opacity = 0.00)
        .wait(400).then(() => window.sequencer.dispatch({type: 'END_FADE_OUT'}));
    } else if (this.props.game.screenTransitionState === 'FADE_IN') {
      scheduler
        .first(         () => this.refs.fadeOutTarget.style.opacity = 0.33)
        .wait(400).then(() => this.refs.fadeOutTarget.style.opacity = 0.66)
        .wait(400).then(() => this.refs.fadeOutTarget.style.opacity = 1.00)
        .wait(400).then(() => window.sequencer.dispatch({type: 'END_FADE_IN'}));
    }
  }

  render() {
    return (
      <div className="game-frame__wrapper">
        <div ref="fadeOutTarget" className="game-frame">
          <PositionShiftComponent game={this.props.game} onMovementFinished={() => {
            window.sequencer.dispatch(movementFinished());
            window.sequencer.dispatch(triggerMovement());
          }}>
            <TileDisplayComponent game={this.props.game} />
          </PositionShiftComponent>
          <TextDisplayComponent game={this.props.game} onActFinished={() => {
            window.sequencer.dispatch(act());
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

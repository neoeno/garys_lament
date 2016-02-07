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
import * as actions from '../actions/game';

class AppComponent extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.game.screenTransitionState == this.props.game.screenTransitionState) { return; }
    if (this.props.game.screenTransitionState === 'FADE_OUT') {
      scheduler
        .first(         () => this.refs.fadeOutTarget.style.opacity = 0.75)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 0.50)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 0.25)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 0.00)
        .then(() => window.sequencer.dispatch({type: 'END_FADE_OUT'}));
    } else if (this.props.game.screenTransitionState === 'FADE_IN') {
      scheduler
        .first(         () => this.refs.fadeOutTarget.style.opacity = 0.25)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 0.50)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 0.75)
        .wait(100).then(() => this.refs.fadeOutTarget.style.opacity = 1.00)
        .then(() => window.sequencer.dispatch({type: 'END_FADE_IN'}));
    }
  }

  render() {
    return (
      <div className="game-frame__wrapper">
        <div className="game-frame">
          <div ref="fadeOutTarget">
            <PositionShiftComponent game={this.props.game} onMovementFinished={() => {
              window.sequencer.dispatch(actions.movementFinished());
              window.sequencer.dispatch(actions.triggerMovement());
            }}>
              <TileDisplayComponent game={this.props.game} />
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

require('normalize.css');
require('styles/App.css');
require('styles/GameFrame.css');

import React from 'react';
import { connect } from 'react-redux';
import TileDisplayComponent from './TileDisplayComponent';
import TextDisplayComponent from './TextDisplayComponent';
import PlayerComponent from './PlayerComponent';
import move from '../actions/game/move';
import act from '../actions/game/act';
import teleport from '../actions/game/teleport';
import fadeOut from '../actions/game/fadeOut';
import fadeIn from '../actions/game/fadeIn';
import * as UI from '../lib/UI';
import * as Game from '../lib/Game';
import * as Tiled from '../lib/Tiled';
import maps from '../game/maps';

class AppComponent extends React.Component {
  componentDidMount() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  handleKeyDown(evt) {
    if (evt.repeat) { return; }
    if (UI.isActionKey(evt.which)) { this.props.dispatch(act()); }
    if (UI.isMovementKey(evt.which)) {
      if (Game.isShowingModal(this.props.game)) { return; }
      if (Game.isTeleporting(this.props.game)) { return; }
      let movement = UI.keyToMovement(evt.which);
      clearInterval(this.repeatTimer);
      this.repeatTimer = window.setInterval(() => this.sendMovement(movement), 200);
      this.sendMovement(movement);
    }
  }

  sendMovement(movement) {
    this.props.dispatch(move(movement));
    if (Tiled.isPortalAtPosition(maps[this.props.game.map])(this.props.game)) {
      this.props.dispatch(fadeOut());
      window.setTimeout(() => {
        this.props.dispatch(teleport(Tiled.getPortalAtPosition(maps[this.props.game.map])(this.props.game)));
      }, 800);
      window.setTimeout(() => {
        this.props.dispatch(fadeIn());
      }, 1200);
    }
  }

  handleKeyUp() {
    if (!this.repeatTimer) { return; }
    clearInterval(this.repeatTimer);
  }

  render() {
    let gameFrameClass = {'FADE_OUT': 'is-fade-out', 'SHOW': ''}[this.props.game.screenTransitionState];
    return (
      <div className="game-frame__wrapper">
        <div className={`game-frame ${gameFrameClass}`}>
          <TileDisplayComponent game={this.props.game} />
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

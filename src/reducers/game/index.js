/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import standingReducer from './standing';
import walkingReducer from './walking';
import actingReducer from './acting';
import teleportingReducer from './teleporting';

import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';

const tmpGetEpisode = () => window.location.search.substr(1) || 'flat_1';

const player = Tiled.getObjectByName('Player')(episodes.flat_1.maps.barbican__flat__bedroom);
const initialState = {
  gameState: 'STANDING',
  gameStateTick: 0,
  x: Math.floor(player.x / episodes.flat_1.maps.barbican__flat__bedroom.tilewidth),
  y: Math.floor(player.y / episodes.flat_1.maps.barbican__flat__bedroom.tileheight),
  modalText: null,
  modalTextState: null,
  facing: 'south',
  episode: tmpGetEpisode(),
  map: 'barbican__flat__bedroom',
  modalState: 'HIDDEN',
  screenTransitionState: 'SHOW',
  walking: false,
  moving: false,
  tweenMovements: true,
  teleportingViaPortal: null
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'TICK': {
      Object.assign(nextState, Game.tickGameState(nextState));

      switch (state.gameState) {
        case 'STANDING': {
          return standingReducer(nextState, action);
        } break;
        case 'WALKING': {
          return walkingReducer(nextState, action);
        } break;
        case 'ACTING': {
          return actingReducer(nextState, action);
        } break;
        case 'TELEPORTING': {
          return teleportingReducer(nextState, action);
        } break;
        default: {
          return state;
        }
      }
    } break;
    case 'MOVEMENT_CONTROLS_CHANGE': {
      nextState.movementKeyPressed = action.keyState;
      return nextState;
    } break;
    case 'ACT': {
      nextState.actKeyPressed = true;
      return nextState;
    }
    default: {
      return state;
    }
  }
};

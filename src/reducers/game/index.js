/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import standingReducer from './standing';
import walkingReducer from './walking';
import talkingReducer from './talking';
import teleportingReducer from './teleporting';

import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';

const tmpGetEpisode = () => window.location.search.substr(1) || 'flat_1';

const player = Tiled.getObjectByName('Player')(episodes.flat_1.maps.barbican__flat__bedroom);
const initialState = {
  gameState: ['STANDING'],
  gameStateTick: 0,
  x: Math.floor(player.x / episodes.flat_1.maps.barbican__flat__bedroom.tilewidth),
  y: Math.floor(player.y / episodes.flat_1.maps.barbican__flat__bedroom.tileheight),
  modalText: null,
  modalTextState: null,
  facing: 'south',
  episode: tmpGetEpisode(),
  map: 'barbican__flat__bedroom',
  modalState: 'HIDDEN',
  walking: false,
  teleportingViaPortal: null
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'TICK': {
      Object.assign(nextState, Game.tickGameState(nextState));

      switch (Game.activeState(state)) {
        case 'STANDING': {
          return standingReducer(nextState, action);
        } break;
        case 'WALKING': {
          return walkingReducer(nextState, action);
        } break;
        case 'TALKING': {
          return talkingReducer(nextState, action);
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
    case 'INTERACT': {
      nextState.interactKeyPressed = true;
      return nextState;
    }
    default: {
      return state;
    }
  }
};

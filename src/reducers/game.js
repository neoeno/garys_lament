/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */

import maps from '../game/maps';
import texts from '../game/texts';
import * as Tiled from '../lib/Tiled';
import * as Game from '../lib/Game';
import * as Text from '../lib/Text';

const player = Tiled.getObjectByName('Player')(maps.flat);
const initialState = {
  x: Math.floor(player.x / maps.flat.tilewidth),
  y: Math.floor(player.y / maps.flat.tileheight),
  modalText: null,
  modalTextState: null,
  facing: 'south',
  map: 'flat',
  modalState: 'HIDDEN',
  screenTransitionState: 'SHOW',
  walking: false,
  moving: false,
  tweenMovements: true
};

module.exports = function(state = initialState, action) {
  /* Keep the reducer clean - do not mutate the original state. */
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case 'MOVEMENT_CONTROLS_CHANGE': {
      nextState.movementKeyPressed = action.keyState;
      return nextState;
    } break;
    case 'ACT': {
      let talker = Tiled.getFacingTalker(maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      if (!talker) { return state; }
      let text = texts[nextState.map][talker.properties.text];
      let textMachine = Text.makeTextMachine(text);

      Object.assign(nextState, Game.stepModalStateMachine(state)(textMachine));
      nextState.walking = false;

      return nextState;
    } break;
    case 'BEGIN_FADE_OUT': {
      Object.assign(nextState, {screenTransitionState: 'FADE_OUT'});
      return nextState;
    } break;
    case 'END_FADE_OUT': {
      Object.assign(nextState, {screenTransitionState: 'HIDE'});
      return nextState;
    } break;
    case 'BEGIN_FADE_IN': {
      Object.assign(nextState, {screenTransitionState: 'FADE_IN'});
      return nextState;
    } break;
    case 'END_FADE_IN': {
      Object.assign(nextState, {screenTransitionState: 'SHOW'});
      return nextState;
    } break;
    case 'FACE_DIRECTION': {
      nextState.facing = action.direction;
      return nextState;
    } break;
    case 'SET_WALKING_STATUS': {
      nextState.walking = action.status;
      return nextState;
    } break;
    case 'SET_MOVING_STATUS': {
      nextState.moving = action.status;
      return nextState;
    } break;
    case 'SET_TWEEN_MOVEMENTS': {
      nextState.tweenMovements = action.flag;
      return nextState;
    } break;
    case 'BEGIN_MOVE_TO': {
      Object.assign(nextState, action.position);
      return nextState;
    } break;
    case 'CHANGE_MAP': {
      nextState.map = action.map;
      return nextState;
    } break;
    case 'CHANGE_POSITION': {
      Object.assign(nextState, action.position);
      return nextState;
    } break;
    case 'ENABLE_CONTROLS': {
      nextState.controlsDisabled = false;
      return nextState;
    } break;
    case 'DISABLE_CONTROLS': {
      nextState.controlsDisabled = true;
      return nextState;
    } break;
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
};

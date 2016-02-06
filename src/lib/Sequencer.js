import * as Game from '../lib/Game';
import * as UI from '../lib/UI';
import * as Tiled from '../lib/Tiled';
import maps from '../game/maps';
import { isMatch } from 'lodash';

let faceDirection = direction => ({type: 'FACE_DIRECTION', direction});
let setWalkingStatus = status => ({type: 'SET_WALKING_STATUS', status});
let beginMoveTo = position => ({type: 'BEGIN_MOVE_TO', position});
let setMovingStatus = status => ({type: 'SET_MOVING_STATUS', status});
let changeMap = map => ({type: 'CHANGE_MAP', map});
let changePosition = position => ({type: 'CHANGE_POSITION', position});
let beginFadeOut = () => ({type: 'BEGIN_FADE_OUT'});
let beginFadeIn = () => ({type: 'BEGIN_FADE_IN'});

let isMovingBlocked = state => (
  Game.isShowingModal(state) || Game.isTeleporting(state) || Game.isMoving(state));

let storePromise = store => match => {
  return new Promise(resolve => {
    let unsubscribe = store.subscribe(() => {
      if (isMatch(store.getState().game, match)) {
        unsubscribe();
        resolve();
      }
    });
  });
};

let fadeOut = store => {
  store.dispatch(beginFadeOut());
  return storePromise(store)({screenTransitionState: 'HIDE'});
};

let movementIntentSequence = async (store) => {
  let state = store.getState().game;
  if (isMovingBlocked(state)) { return; }

  let movement = UI.activeKeyToMovement(state.movementKeyPressed);
  let targetPosition = Game.movePosition(state)(movement);

  store.dispatch(faceDirection(Game.faceMovementDirection(movement)));
  store.dispatch(setWalkingStatus(Game.walkingStatus(movement)));

  if (Tiled.canWalkTo(targetPosition)(maps[state.map])) {
    store.dispatch(setMovingStatus(Game.movingStatus(movement)));
    store.dispatch(beginMoveTo(targetPosition));
  } else if (Tiled.isPortalAtPosition(maps[state.map])(targetPosition)) {
    let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
    let [x, y] = portal.properties.position.split(',').map(s => parseInt(s));

    await fadeOut(store);
    store.dispatch(changeMap(portal.properties.map));
    store.dispatch(changePosition({x, y}));
    store.dispatch(faceDirection({facing: portal.properties.facing}));
    store.dispatch(beginFadeIn());
  }
};

export default store => {
  return {
    dispatch: action => {
      switch (action.type) {
        case 'TRIGGER_MOVEMENT': {
          movementIntentSequence(store);
        } break;
        case 'MOVEMENT_FINISHED': {
          store.dispatch(setMovingStatus({moving: false}));
        } break;
        default: {
          store.dispatch(action);
        }
      }
    }
  };
};

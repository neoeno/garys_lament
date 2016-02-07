import * as Game from '../lib/Game';
import * as UI from '../lib/UI';
import * as Tiled from '../lib/Tiled';
import maps from '../game/maps';
import { isMatch } from 'lodash';
import * as actions from '../actions/game';


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
  store.dispatch(actions.beginFadeOut());
  return storePromise(store)({screenTransitionState: 'HIDE'});
};

let fadeIn = store => {
  store.dispatch(actions.beginFadeIn());
  return storePromise(store)({screenTransitionState: 'SHOW'});
};

let movementIntentSequence = (store) => async () => {
  let state = store.getState().game;
  if (isMovingBlocked(state)) { return; }

  let movement = UI.activeKeyToMovement(state.movementKeyPressed);
  let targetPosition = Game.movePosition(state)(movement);

  store.dispatch(actions.faceDirection(Game.faceMovementDirection(movement)));
  store.dispatch(actions.setWalkingStatus(Game.walkingStatus(movement)));

  if (Tiled.canWalkTo(targetPosition)(maps[state.map])) {
    store.dispatch(actions.setMovingStatus(Game.movingStatus(movement)));
    store.dispatch(actions.beginMoveTo(targetPosition));
  } else if (Tiled.isPortalAtPosition(maps[state.map])(targetPosition)) {
    let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
    let [x, y] = portal.properties.position.split(',').map(s => parseInt(s));

    await fadeOut(store);
    store.dispatch(actions.changeMap(portal.properties.map));
    store.dispatch(actions.changePosition({x, y}));
    store.dispatch(actions.faceDirection({facing: portal.properties.facing}));
    store.dispatch(actions.setWalkingStatus({walking: false}));
    state = store.getState().game;

    await fadeIn(store);
    if (portal.properties.walk == 'true') {
      store.dispatch(actions.setMovingStatus({moving: true}));
      store.dispatch(actions.setWalkingStatus({walking: true}));
      let secondaryMovement = Game.facingToMovement(portal.properties.facing);
      let secondaryTargetPosition = Game.movePosition(state)(secondaryMovement);
      store.dispatch(actions.beginMoveTo(secondaryTargetPosition));
    } else {
      store.dispatch(actions.triggerMovement());
    }
  }
};

let intercepts = {
  'TRIGGER_MOVEMENT': movementIntentSequence,
  'MOVEMENT_FINISHED': store => () => store.dispatch(actions.setMovingStatus({moving: false}))
};

export default store => {
  let fakeStore = {
    subscribe: store.subscribe,
    getState: store.getState,
    dispatch: action => {
      if (intercepts[action.type]) {
        intercepts[action.type](fakeStore)(action);
      } else {
        store.dispatch(action);
      }
    }
  };
  return fakeStore;
};

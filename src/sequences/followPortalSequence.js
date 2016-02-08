import * as actions from '../actions/game';
import * as Game from '../lib/Game';
import storePromise from '../lib/storePromise';

let fadeOut = store => {
  store.dispatch(actions.beginFadeOut());
  return storePromise(store)({screenTransitionState: 'HIDE'});
};

let fadeIn = store => {
  store.dispatch(actions.beginFadeIn());
  return storePromise(store)({screenTransitionState: 'SHOW'});
};

export default (store) => async (portal) => {
  let [x, y] = portal.properties.position.split(',').map(s => parseInt(s));

  await fadeOut(store);
  store.dispatch(actions.changeMap(portal.properties.map));
  store.dispatch(actions.changePosition({x, y}));
  store.dispatch(actions.faceDirection({facing: portal.properties.facing}));
  store.dispatch(actions.setWalkingStatus({walking: false}));
  await fadeIn(store);

  let state = store.getState().game;

  if (portal.properties.walk == 'true') {
    store.dispatch(actions.setMovingStatus({moving: true}));
    store.dispatch(actions.setWalkingStatus({walking: true}));
    let secondaryMovement = Game.facingToMovement(portal.properties.facing);
    let secondaryTargetPosition = Game.movePosition(state)(secondaryMovement);
    store.dispatch(actions.beginMoveTo(secondaryTargetPosition));
  } else {
    store.dispatch(actions.triggerMovement());
  }
};
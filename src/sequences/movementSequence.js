import * as Game from '../lib/Game';
import * as Tiled from '../lib/Tiled';
import * as actions from '../actions/game';
import maps from '../game/maps';
import followPortalSequence from './followPortalSequence';
import storePromise from '../lib/storePromise';

let moveTo = store => targetPosition => {
  store.dispatch(actions.setMovingStatus(true));
  store.dispatch(actions.beginMoveTo(targetPosition));
  return storePromise(store)({moving: false});
};

export default (store) => async (movement) => {
  let state = store.getState().game;
  let targetPosition = Game.movePosition(state)(movement);

  store.dispatch(actions.faceDirection(Game.movementToDirection(movement)));
  store.dispatch(actions.setWalkingStatus(true));

  if (Tiled.isPortalAtPosition(maps[state.map])(targetPosition)) {
    store.dispatch(actions.disableControls());

    if (Game.movementToDirection(movement) == 'north') {
      await moveTo(store)(targetPosition);
      store.dispatch(actions.setWalkingStatus(false));
    }

    let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
    await followPortalSequence(store)(portal);
    store.dispatch(actions.enableControls());

    store.dispatch(actions.triggerMovement());
  } else if (Tiled.canWalkTo(targetPosition)(maps[state.map])) {
    moveTo(store)(targetPosition);
  }
};

import * as Game from '../lib/Game';
import * as Tiled from '../lib/Tiled';
import * as actions from '../actions/game';
import maps from '../game/maps';
import followPortalSequence from './followPortalSequence';
import storePromise from '../lib/storePromise';

let move = store => targetPosition => {
  store.dispatch(actions.setMovingStatus({moving: true}));
  store.dispatch(actions.beginMoveTo(targetPosition));
  return storePromise(store)({moving: false});
};

export default (store) => async (movement) => {
  let state = store.getState().game;
  let targetPosition = Game.movePosition(state)(movement);

  store.dispatch(actions.faceDirection(Game.faceMovementDirection(movement)));
  store.dispatch(actions.setWalkingStatus({walking: true}));

  if (Tiled.isPortalAtPosition(maps[state.map])(targetPosition)) {
    if (Game.movementToFacing(movement) == 'north') {
      await move(store)(targetPosition);
    }

    let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
    followPortalSequence(store)(portal);
  } else if (Tiled.canWalkTo(targetPosition)(maps[state.map])) {
    move(store)(targetPosition);
  }
};

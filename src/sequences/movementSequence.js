import * as Game from '../lib/Game';
import * as Tiled from '../lib/Tiled';
import * as actions from '../actions/game';
import maps from '../game/maps';
import followPortalSequence from './followPortalSequence';

export default (store) => (movement) => {
  let state = store.getState().game;
  let targetPosition = Game.movePosition(state)(movement);

  store.dispatch(actions.faceDirection(Game.faceMovementDirection(movement)));
  store.dispatch(actions.setWalkingStatus(Game.walkingStatus(movement)));

  if (Tiled.canWalkTo(targetPosition)(maps[state.map])) {
    store.dispatch(actions.setMovingStatus(Game.movingStatus(movement)));
    store.dispatch(actions.beginMoveTo(targetPosition));
  } else if (Tiled.isPortalAtPosition(maps[state.map])(targetPosition)) {
    let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
    followPortalSequence(store)(portal);
  }
};

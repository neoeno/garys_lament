import * as Game from '../lib/Game';
import * as UI from '../lib/UI';
import movementSequence from './movementSequence';
import * as actions from '../actions/game';

export default (store) => () => {
  let state = store.getState().game;
  if (Game.isMovingBlocked(state)) { return; }

  let movement = UI.activeKeyToMovement(state.movementKeyPressed);

  if (movement.x == 0 && movement.y == 0) {
    store.dispatch(actions.setWalkingStatus({walking: false}));
    store.dispatch(actions.setMovingStatus({moving: false}));
  } else {
    movementSequence(store)(movement);
  }
};

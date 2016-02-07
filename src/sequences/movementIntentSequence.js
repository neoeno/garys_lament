import * as Game from '../lib/Game';
import * as UI from '../lib/UI';
import movementSequence from './movementSequence';

export default (store) => () => {
  let state = store.getState().game;
  if (Game.isMovingBlocked(state)) { return; }

  let movement = UI.activeKeyToMovement(state.movementKeyPressed);
  movementSequence(store)(movement);
};

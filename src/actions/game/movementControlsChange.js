import * as Game from '../../lib/Game';
import * as UI from '../../lib/UI';
import move from './move';

module.exports = function(keyState) {
  return (dispatch, getState) => {
    const game = getState().game;
    if (Game.isShowingModal(game)) { return; }
    if (Game.isTeleporting(game)) { return; }
    let movement = UI.activeKeyToMovement(keyState);
    dispatch(move(movement));
  };
};

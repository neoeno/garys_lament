import episodes from '../../game/episodes';
import processMovement from './processMovement';
import * as Game from '../../lib/Game';
import * as Text from '../../lib/Text';
import * as Tiled from '../../lib/Tiled';

export default function(nextState, action) {
  switch (action.type) {
    case 'TICK': {
      if (nextState.interactKeyPressed) {
        nextState.interactKeyPressed = false;

        let talker = Tiled.getFacingTalker(episodes[nextState.episode].maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
        if (talker) {
          Object.assign(nextState, Game.pushState(nextState)('TALKING'));
          Object.assign(nextState, Text.startNewTextFrame(episodes[nextState.episode].texts[nextState.map])(talker)(nextState));
        }

        return nextState;
      } else {
        return processMovement(nextState);
      }
    } break;
    default: {
      return nextState;
    }
  }
}

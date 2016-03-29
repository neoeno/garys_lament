import episodes from '../../game/episodes';
import * as Tiled from '../../lib/Tiled';
import * as Game from '../../lib/Game';
import * as Text from '../../lib/Text';

export let modalAct = (nextState) => {
  switch (nextState.modalState) {
    case 'ANIMATING': {
      return Text.showFullTextFrame(nextState);
    } break;
    case 'HOLD': {
      let talker = Tiled.getFacingTalker(episodes[nextState.episode].maps[nextState.map])({x: nextState.x, y: nextState.y})(nextState.facing);
      return Text.startNewTextFrame(episodes[nextState.episode].texts[nextState.map])(talker)(nextState);
    } break;
    default: {
      return {};
    }
  }
};

export default function(nextState) {
  if (nextState.modalState == 'ANIMATING') {
    if (nextState.gameStateTick % 2 == 0) {
      Object.assign(nextState, Text.stepTextFrameAnimation(nextState));
    }
  }

  if (nextState.actKeyPressed) {
    nextState.actKeyPressed = false;

    Object.assign(nextState, modalAct(nextState));

    if (nextState.modalState == 'HIDDEN') {
      Object.assign(nextState, Game.popState(nextState));
    }
  }

  return nextState;
}

import key from 'key';
import Rx from 'rx';

import movementControlsChange from '../actions/game/movementControlsChange';
import act from '../actions/game/act';

const ARROWS = key.code.arrow;
const ACTIONS = {
  space: key.code.special.space,
  enter: key.code.special.enter
};

export let observe = dom => dispatch => {
  let arrowStatus = {
    [ARROWS.up.code]: 0,
    [ARROWS.right.code]: 0,
    [ARROWS.down.code]: 0,
    [ARROWS.left.code]: 0
  };

  let eventStreamForKeyCode = eventName => keyCode => {
    return Rx.Observable
             .fromEvent(dom, eventName)
             .pluck('keyCode')
             .filter(code => code === keyCode);
  };

  let keyStatus = keyCode => {
    return eventStreamForKeyCode('keydown')(keyCode)
             .map(() => 1)
             .merge(eventStreamForKeyCode('keyup')(keyCode)
                      .map(() => 0))
             .distinctUntilChanged();
  };

  let keyStatusObject = keyCode => {
    return keyStatus(keyCode)
      .map(status => ({[keyCode]: status}));
  };

  let arrowKeyStateStream = keyStatusObject(ARROWS.up.code)
    .merge(keyStatusObject(ARROWS.right.code))
    .merge(keyStatusObject(ARROWS.down.code))
    .merge(keyStatusObject(ARROWS.left.code))
    .scan((memo, o) => Object.assign(memo, o), arrowStatus);

  let actionKeyStateStream = keyStatus(ACTIONS.space.code)
    .merge(keyStatus(ACTIONS.enter.code))
    .distinctUntilChanged()
    .filter((status) => status);

  arrowKeyStateStream.subscribe((controlsStatus) => dispatch(movementControlsChange(controlsStatus)));
  actionKeyStateStream.subscribe((controlsStatus) => dispatch(act(controlsStatus)));
};

import key from 'key';
import Rx from 'rx';

import movementControlsChange from '../actions/game/movementControlsChange';
import act from '../actions/game/act';

Rx.Observable.prototype.repeatAtInterval = function(interval) {
  return this
    .map((item) => Rx.Observable.timer(0, interval).map(() => item))
    .switch();
};

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

  let keyDowns = keyCodes => {
    let keyDown = keyCode => keyStatus(keyCode).filter((a) => a).map(() => keyCode);
    return keyCodes
      .reduce((observable, keyCode) => observable.merge(keyDown(keyCode)), keyDown(keyCodes.pop()));
  };

  let keyStatusObject = keyCode => {
    return keyStatus(keyCode)
      .map(status => ({[keyCode]: status}));
  };

  let activeArrowKeyStream = keyStatusObject(ARROWS.up.code)
    .merge(keyStatusObject(ARROWS.right.code))
    .merge(keyStatusObject(ARROWS.down.code))
    .merge(keyStatusObject(ARROWS.left.code))
    .scan((memo, o) => Object.assign(memo, o), arrowStatus)
    .combineLatest(keyDowns([ARROWS.up.code, ARROWS.right.code, ARROWS.down.code, ARROWS.left.code]))
    .map(([status, lastKeyDown]) => status[lastKeyDown] ? lastKeyDown : null)
    .repeatAtInterval(400);

  let actionKeyStateStream = keyStatus(ACTIONS.space.code)
    .merge(keyStatus(ACTIONS.enter.code))
    .distinctUntilChanged()
    .filter((status) => status);

  activeArrowKeyStream.subscribe((controlsStatus) => console.log((controlsStatus)));
  activeArrowKeyStream.subscribe((controlsStatus) => dispatch(movementControlsChange(controlsStatus)));
  actionKeyStateStream.subscribe((controlsStatus) => dispatch(act(controlsStatus)));
};

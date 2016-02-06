import * as Tiled from './Tiled';

export let isShowingModal = state => {
  return state.modalState !== 'HIDDEN';
};

export let isTeleporting = state => {
  return state.screenTransitionState !== 'SHOW';
};

export let isWalking = state => {
  return !!state.walking;
};

export let isMoving = state => {
  return !!state.moving;
};

export let movePosition = ({x, y}) => movement => {
  return {
    x: x + movement.x,
    y: y + movement.y
  };
};

export let followPortal = maps => state => movement => {
  let targetPosition = movePosition(state)(movement);
  let portal = Tiled.getPortalAtPosition(maps[state.map])(targetPosition);
  let nextMap = portal.properties.portalTo;
  let newPosition = Tiled.pixelPositionToTilePosition(Tiled.getPortalToMap(maps[nextMap])(state.map));

  if (!Tiled.canWalkTo(newPosition)(maps[nextMap])) {
    newPosition = movePosition(newPosition)(movement);
  }

  return {
    map: nextMap,
    x: newPosition.x,
    y: newPosition.y
  };
};

export let movementToFacing = movement => {
  if (movement.y == -1) {
    return 'north';
  } else if (movement.x == 1) {
    return 'east';
  } else if (movement.y == 1) {
    return 'south';
  } else if (movement.x == -1) {
    return 'west';
  }
};

export let faceMovementDirection = movement => {
  if (movement.x == 0 && movement.y == 0) { return {}; }
  return {
    facing: movementToFacing(movement)
  };
};

export let walkingStatus = movement => {
  if (movement.x == 0 && movement.y == 0) {
    return {walking: false};
  } else {
    return {walking: true};
  }
};

export let movingStatus = movement => {
  if (movement.x == 0 && movement.y == 0) {
    return {moving: false};
  } else {
    return {moving: true};
  }
};

export let stepModalStateMachine = state => textMachine => {
  switch (state.modalState) {
    case 'HIDDEN': {
      let {text, nextState} = textMachine(state.modalTextState);
      return { modalState: 'ANIMATING', modalText: text, modalTextState: nextState };
    } case 'ANIMATING': {
      return { modalState: 'HOLD' };
    } case 'HOLD': {
      let {text, nextState} = textMachine(state.modalTextState);
      if (text) {
        return { modalState: 'ANIMATING', modalText: text, modalTextState: nextState };
      } else {
        return { modalState: 'HIDDEN', modalTextState: null };
      }
    }
  }
};

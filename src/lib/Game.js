import { getPortalToMap } from './Tiled';
import * as Text from './Text';

export let isShowingModal = state => {
  return state.modalState !== 'HIDDEN';
};

export let isTeleporting = state => {
  return state.screenTransitionState !== 'SHOW';
};

export let movePosition = ({x, y}) => movement => {
  return {
    x: x + movement.x,
    y: y + movement.y
  };
};

export let followPortal = maps => currentMap => portal => {
  let nextMap = portal.properties.portalTo;
  let {x, y} = getPortalToMap(maps[nextMap])(currentMap);
  return {
    map: nextMap,
    x: x/16,
    y: y/16
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
  } else {
    return 'south';
  }
};

export let faceMovementDirection = movement => {
  return {
    facing: movementToFacing(movement)
  };
};

export let stepModalStateMachine = state => talker => {
  switch (state.modalState) {
    case 'HIDDEN': {
      return { modalState: 'ANIMATING', modalTextIndex: 0 };
    } case 'ANIMATING': {
      return { modalState: 'HOLD' };
    } case 'HOLD': {
      if (Text.noParagraphs(talker.properties.text) > state.modalTextIndex + 1) {
        return { modalState: 'ANIMATING', modalTextIndex: state.modalTextIndex + 1 };
      } else {
        return { modalState: 'HIDDEN' };
      }
    }
  }
};
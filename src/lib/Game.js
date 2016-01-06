import { getPortalAtPosition, getPortalToMap } from './Tiled';

export let isShowingModal = state => {
  return state.showTextIndex !== null;
};

export let movePosition = ({x, y}) => movement => {
  return {
    x: x + movement.x,
    y: y + movement.y
  };
};

export let followPortal = maps => state => position => {
  let nextMap = getPortalAtPosition(maps[state.map])(position).properties.portalTo;
  let {x, y} = getPortalToMap(maps[nextMap])(state.map);
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
  }
}

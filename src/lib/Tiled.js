import _ from 'lodash';

let tilesetCols = tileset => {
  return Math.floor(tileset.imagewidth / tileset.tilewidth);
};

export let tileNumberToOffset = tileset => number => {
  return {
    x: ((number - 1) % tilesetCols(tileset)) * tileset.tileheight,
    y: Math.floor((number - 1) / tilesetCols(tileset)) * tileset.tilewidth
  };
};

export let layerRows = layer => {
  return _.chunk(layer.data, layer.width);
};

export let getLayerByName = layerName => map => {
  return map.layers.find((layer) => layer.name == layerName);
};

export let getThingsByLayer = layerName => map => {
  return getLayerByName(layerName)(map).objects;
};

export let getThingByLayerAndName = layerName => objectName => map => {
  return getThingsByLayer(layerName)(map).find((object) => object.name == objectName);
};

export let getThingsByLayerAndType = layerName => objectType => map => {
  return getThingsByLayer(layerName)(map).filter((object) => object.type == objectType);
};

export let getObjectByName = getThingByLayerAndName('Objects');
export let getObjectsByType = getThingsByLayerAndType('Objects');
export let getTalkers = getThingsByLayer('Talkers');
export let getPortals = getThingsByLayer('Portals');

export let getPortalToMap = map => mapName => {
  return getPortals(map).find((portal) => portal.properties.portalTo == mapName);
};

export let objectCovers = object => position => {
  return (
    ((position.x * 16) >= object.x) &&
    ((position.x * 16) < (object.x + object.width)) &&
    ((position.y * 16) >= object.y) &&
    ((position.y * 16) < (object.y + object.height))
  );
};

export let canWalkTo = position => map => {
  return getObjectsByType('Room')(map).some((obj) => {
    return objectCovers(obj)(position);
  }) && !getObjectsByType('Furniture')(map).some((obj) => {
    return objectCovers(obj)(position);
  });
};

export let getTextForPosition = map => position => {
  return getTalkers(map).find((talker) => {
    return objectCovers(talker)(position);
  });
};

export let getFacingCellPosition = position => facing => {
  let facingCellPosition = Object.assign({}, position);
  if (facing == 'north') {
    facingCellPosition.y = facingCellPosition.y - 1;
  } else if (facing == 'east') {
    facingCellPosition.x = facingCellPosition.x + 1;
  } else if (facing == 'south') {
    facingCellPosition.y = facingCellPosition.y + 1;
  } else if (facing == 'west') {
    facingCellPosition.x = facingCellPosition.x - 1;
  }
  return facingCellPosition;
};

export let getFacingTalker = map => position => facing => {
  return getTextForPosition(map)(getFacingCellPosition(position)(facing));
};

export let isFacingTalker = map => position => facing => {
  return !!getFacingTalker(map)(position)(facing);
};

export let getPortalAtPosition = map => position => {
  return getPortals(map).find((portal) => {
    return objectCovers(portal)(position);
  });
};

export let isPortalAtPosition = map => position => {
  return !!getPortalAtPosition(map)(position);
};

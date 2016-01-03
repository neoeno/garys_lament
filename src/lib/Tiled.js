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

export let getLayerByName = map => layerName => {
  return map.layers.find((layer) => layer.name == layerName);
};

export let getObjectByName = map => objectName => {
  return getLayerByName(map)('Objects').objects.find((object) => object.name == objectName);
};

export let getObjectsByType = map => objectType => {
  return getLayerByName(map)('Objects').objects.filter((object) => object.type == objectType);
};

export let objectCovers = object => position => {
  return (
    ((position.x * 16) >= object.x) &&
    ((position.x * 16) < (object.x + object.width)) &&
    ((position.y * 16) >= object.y) &&
    ((position.y * 16) < (object.y + object.height))
  );
};

export let canWalkTo = map => position => {
  return getObjectsByType(map)('Room').some((obj) => {
    return objectCovers(obj)(position);
  }) && !getObjectsByType(map)('Furniture').some((obj) => {
    return objectCovers(obj)(position);
  });
};

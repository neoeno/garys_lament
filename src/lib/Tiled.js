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
  return _.find(map.layers, (layer) => layer.name == layerName);
};

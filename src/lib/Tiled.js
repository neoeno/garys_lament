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

export let mapRows = map => layerNo => {
  return _.chunk(map.layers[layerNo].data, map.width);
};

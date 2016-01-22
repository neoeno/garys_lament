'use strict';

import React from 'react';
import maps from '../game/maps';
import { layerRows, tileNumberToOffset, getLayerByName } from '../lib/Tiled';

require('styles/TileDisplay.css');

let offsetToBackgroundPosition = (offset) => `-${offset.x}px -${offset.y}px`;

class TileDisplayComponent extends React.Component {
  background() {
    return layerRows(getLayerByName('Background')(maps[this.props.game.map])).map((row, i) => {
      let cells = row.map((cellValue, i2) => {
        return (<span key={i2}>{this.imageCell(cellValue)}</span>);
      });
      return (<div className="tile-display__row" key={i}>{cells}</div>);
    });
  }

  imageCell(cellValue) {
    return (
      <div
        className="tile-display__cell"
        style={{backgroundPosition:
          offsetToBackgroundPosition(
            tileNumberToOffset(maps[this.props.game.map].tilesets[0])(cellValue)
          )
        }} />
    );
  }

  componentDidMount() {
    this.updateTileDisplayTransform();
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.game.x === this.props.game.x) && (prevProps.game.y === this.props.game.y)) { return; }
    this.updateTileDisplayTransform();
  }

  updateTileDisplayTransform() {
    this.refs.tileDisplay.style.transform = `translate3d(${80 - this.props.game.x * 16}px, ${80 - this.props.game.y * 16}px, 0px)`;
  }

  render() {
    return (
      <div ref="tileDisplay" className="tile-display">
        {this.background()}
      </div>
    );
  }
}

TileDisplayComponent.displayName = 'TileDisplayComponent';

TileDisplayComponent.propTypes = {
  game: React.PropTypes.object.isRequired
};

export default TileDisplayComponent;

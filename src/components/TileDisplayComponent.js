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

  tileDisplayOffset() {
    return {
      left: `${80 - this.props.game.x * 16}px`,
      top: `${80 - this.props.game.y * 16}px`,
      animation: this.props.game.disableMovementTweening ? 'none' : ''
    };
  }

  render() {
    return (
      <div className="tile-display" style={this.tileDisplayOffset()}>
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

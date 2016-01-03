'use strict';

import React from 'react';
import flatMap from '../game/flatMap.json';
import { mapRows, tileNumberToOffset } from '../lib/Tiled';

require('styles/TileDisplay.css');

let offsetToBackgroundPosition = (offset) => `-${offset.x}px -${offset.y}px`;

class TileDisplayComponent extends React.Component {
  tiles() {
    return mapRows(flatMap)(0).map((row, i) => {
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
            tileNumberToOffset(flatMap.tilesets[0])(cellValue)
          )
        }} />
    );
  }

  render() {
    return (
      <div className="tile-display">
        {this.tiles()}
      </div>
    );
  }
}

TileDisplayComponent.displayName = 'TileDisplayComponent';

// Uncomment properties you need
// TileDisplayComponent.propTypes = {};
// TileDisplayComponent.defaultProps = {};

export default TileDisplayComponent;

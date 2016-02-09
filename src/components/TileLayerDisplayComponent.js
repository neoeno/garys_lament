'use strict';

import React from 'react';
import { layerRows, tileNumberToOffset } from '../lib/Tiled';

require('styles/TileDisplay.css');

let offsetToBackgroundPosition = (offset) => `-${offset.x}px -${offset.y}px`;

class TileLayerDisplayComponent extends React.Component {
  imageCell(cellValue) {
    return (
      <div
        className="tile-display__cell"
        style={{backgroundPosition:
          offsetToBackgroundPosition(
            tileNumberToOffset(this.props.tileset)(cellValue)
          )
        }} />
    );
  }

  tiles() {
    return layerRows(this.props.layer).map((row, i) => {
      let cells = row.map((cellValue, i2) => {
        return (<span key={i2}>{this.imageCell(cellValue)}</span>);
      });
      return (<div className="tile-display__row" key={i}>{cells}</div>);
    });
  }

  render() {
    return (
      <div>
        {this.tiles()}
      </div>
    );
  }
}

TileLayerDisplayComponent.displayName = 'TileLayerDisplayComponent';

TileLayerDisplayComponent.propTypes = {
  layer: React.PropTypes.object.isRequired,
  tileset: React.PropTypes.object.isRequired
};

export default TileLayerDisplayComponent;

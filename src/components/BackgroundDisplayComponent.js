'use strict';

import React from 'react';
import maps from '../game/maps';
import { getLayerByName } from '../lib/Tiled';
import ImageLayerDisplayComponent from './ImageLayerDisplayComponent';
import TileLayerDisplayComponent from './TileLayerDisplayComponent';

require('styles/Layer.css');

class BackgroundDisplayComponent extends React.Component {
  layer() {
    return getLayerByName('Background')(maps[this.props.game.map]);
  }

  background() {
    if (this.layer().type == 'imagelayer') {
      return (<ImageLayerDisplayComponent layer={this.layer()} />);
    } else {
      return (<TileLayerDisplayComponent layer={this.layer()} tileset={maps[this.props.game.map].tilesets[0]} />);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.game.map != nextProps.game.map;
  }

  render() {
    return (
      <div className="layer">
        {this.background()}
      </div>
    );
  }
}

BackgroundDisplayComponent.displayName = 'BackgroundDisplayComponent';

BackgroundDisplayComponent.propTypes = {
  game: React.PropTypes.object.isRequired
};

export default BackgroundDisplayComponent;

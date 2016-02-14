'use strict';

import React from 'react';
import episodes from '../game/episodes';
import { getLayerByName } from '../lib/Tiled';
import TileLayerDisplayComponent from './TileLayerDisplayComponent';

require('styles/Layer.css');

class BackgroundDisplayComponent extends React.Component {
  layer() {
    return getLayerByName('Background')(episodes[this.props.game.episode].maps[this.props.game.map]);
  }

  background() {
    if (this.layer().type == 'imagelayer') {
      return (<img src={episodes[this.props.game.episode].images[this.props.game.map]} />);
    } else {
      return (<TileLayerDisplayComponent layer={this.layer()} tileset={episodes[this.props.game.episode].maps[this.props.game.map].tilesets[0]} />);
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

'use strict';

import React from 'react';
import flatMap from '../game/flatMap.json';
import { getFacingTalker } from '../lib/Tiled';

require('styles/TextDisplay.css');

class TextDisplayComponent extends React.Component {
  actingText() {
    return getFacingTalker(flatMap)({x: this.props.player.x, y: this.props.player.y})(this.props.player.facing);
  }

  render() {
    if (!this.props.player.acting) { return (<div></div>); }
    return (
      <div className="text-display">
        {this.actingText().properties.text}
      </div>
    );
  }
}

TextDisplayComponent.displayName = 'TextDisplayComponent';

TextDisplayComponent.propTypes = {
  player: React.PropTypes.object
};

export default TextDisplayComponent;

'use strict';

import React from 'react';
import flatMap from '../game/flatMap.json';
import { getFacingTalker } from '../lib/Tiled';
import TypingAnimationComponent from './TypingAnimationComponent';

require('styles/TextDisplay.css');

class TextDisplayComponent extends React.Component {
  talker() {
    return getFacingTalker(flatMap)({x: this.props.game.x, y: this.props.game.y})(this.props.game.facing);
  }

  text() {
    return this.talker().properties.text.split('//')[this.props.game.acting - 1];
  }

  render() {
    if (!this.props.game.acting) { return (<div></div>); }
    return (
      <div className="text-display">
        <TypingAnimationComponent text={this.text()} />
      </div>
    );
  }
}

TextDisplayComponent.displayName = 'TextDisplayComponent';

TextDisplayComponent.propTypes = {
  game: React.PropTypes.object
};

export default TextDisplayComponent;

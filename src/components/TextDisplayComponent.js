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
    return this.talker().properties.text.split('//')[this.props.game.showTextIndex - 1];
  }

  render() {
    if (!this.props.game.showTextIndex) { return (<div></div>); }
    return (
      <div className="text-display">
        <TypingAnimationComponent
          text={this.text()}
          animate={this.props.game.acting}
          onAnimationFinish={this.props.onActFinished} />
      </div>
    );
  }
}

TextDisplayComponent.displayName = 'TextDisplayComponent';

TextDisplayComponent.propTypes = {
  game: React.PropTypes.object.isRequired,
  onActFinished: React.PropTypes.func.isRequired
};

export default TextDisplayComponent;

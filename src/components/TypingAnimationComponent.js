'use strict';

import React from 'react';
import * as Text from '../lib/Text';

require('styles/TypingAnimation.css');

let LINE_HEIGHT = 14;

class TypingAnimationComponent extends React.Component {
  splitText() {
    return this.props.text;
  }

  textPortion() {
    return this.splitText().substr(0, this.props.step);
  }

  textOffset() {
    return Math.max(0, this.textPortion().split('\n').length - 4) * -LINE_HEIGHT;
  }

  render() {
    return (
      <div className="typing-animation">
        <div className="typing-animation__lines" style={{top: this.textOffset()}}>
          {this.textPortion()}
        </div>
      </div>
    );
  }
}

TypingAnimationComponent.displayName = 'TypingAnimationComponent';

TypingAnimationComponent.propTypes = {
  text: React.PropTypes.string.isRequired,
  step: React.PropTypes.number.isRequired
};

export default TypingAnimationComponent;

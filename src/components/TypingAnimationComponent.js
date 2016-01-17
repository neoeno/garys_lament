'use strict';

import React from 'react';
import * as Text from '../lib/Text';

require('styles/TypingAnimation.css');

let LINE_HEIGHT = 18;

class TypingAnimationComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      characterLimit: 0,
      ticker: window.setInterval(this.tick.bind(this), 25)
    };
  }

  componentWillUnmount() {
    window.clearInterval(this.state.ticker);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animate != this.props.animate) {
      if (this.props.animate) {
        this.setState({
          characterLimit: 0,
          ticker: window.setInterval(this.tick.bind(this), 25)
        });
      } else {
        window.clearInterval(this.state.ticker);
      }
    }
  }

  tick() {
    if (this.state.characterLimit >= this.splitText().length) {
      window.clearInterval(this.state.ticker);
      this.props.onAnimationFinish();
    }

    this.setState({
      characterLimit: this.state.characterLimit + 1
    });
  }

  splitText() {
    return Text.wrap(this.props.text);
  }

  textPortion() {
    if (!this.props.animate) { return this.splitText(); }
    return this.splitText().substr(0, this.state.characterLimit);
  }

  textOffset() {
    return Math.max(0, this.textPortion().split('\n').length - 3) * -LINE_HEIGHT;
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
  animate: React.PropTypes.bool.isRequired,
  onAnimationFinish: React.PropTypes.func.isRequired
};

export default TypingAnimationComponent;

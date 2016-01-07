'use strict';

import React from 'react';

require('styles/TypingAnimation.css');

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
    if (this.state.characterLimit >= this.props.text.length) {
      window.clearInterval(this.state.ticker);
      this.props.onAnimationFinish();
    }

    this.setState({
      characterLimit: this.state.characterLimit + 1
    });
  }

  textPortion() {
    if (!this.props.animate) { return this.props.text; }
    return this.props.text.substr(0, this.state.characterLimit);
  }

  render() {
    return (
      <div className="typing-animation">
        {this.textPortion()}
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

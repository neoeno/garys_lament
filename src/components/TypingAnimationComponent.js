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
    if (prevProps.text != this.props.text) {
      window.clearInterval(this.state.ticker);
      this.setState({
        characterLimit: 0,
        ticker: window.setInterval(this.tick.bind(this), 25)
      });
    }
  }

  tick() {
    if (this.state.characterLimit >= this.props.text.length) {
      window.clearInterval(this.state.ticker);
    }

    this.setState({
      characterLimit: this.state.characterLimit + 1
    });
  }

  render() {
    return (
      <div className="typing-animation">
        {this.props.text.substr(0, this.state.characterLimit)}
      </div>
    );
  }
}

TypingAnimationComponent.displayName = 'TypingAnimationComponent';

TypingAnimationComponent.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default TypingAnimationComponent;

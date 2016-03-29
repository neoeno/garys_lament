'use strict';

import React from 'react';
import TypingAnimationComponent from './TypingAnimationComponent';

require('styles/TextDisplay.css');

class TextDisplayComponent extends React.Component {
  text() {
    return this.props.game.modalText;
  }

  render() {
    if (this.props.game.modalState == 'HIDDEN') { return (<div></div>); }
    return (
      <div className="text-display">
        <TypingAnimationComponent
          text={this.text()}
          step={this.props.game.textStep} />
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

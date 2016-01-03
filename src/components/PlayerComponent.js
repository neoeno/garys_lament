'use strict';

import React from 'react';

require('styles/Player.css');

class PlayerComponent extends React.Component {
  render() {
    return (<div className={`player is-facing-${this.props.player.facing}`} />);
  }
}

PlayerComponent.displayName = 'PlayerComponent';

PlayerComponent.propTypes = {
  player: React.PropTypes.object.isRequired
};

export default PlayerComponent;

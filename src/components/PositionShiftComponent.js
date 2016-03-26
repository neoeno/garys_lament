'use strict';

import React from 'react';

class PositionShiftComponent extends React.Component {
  componentDidMount() {
    this.transform(this.props.game);
  }

  componentDidUpdate() {
    if (this.props.game.gameState == 'WALKING') {
      this.updateTileDisplayTransform(this.props.game.movingFromPosition, this.props.game);
    } else {
      this.transform(this.props.game);
    }
  }

  transform({x, y}) {
    this.refs.positionShiftElement.style.transform = `translate3d(${80 - x * 16}px, ${80 - y * 16}px, 0px)`;
  }

  updateTileDisplayTransform(from, to) {
    let progress = this.props.game.gameStateTick / 16;
    this.transform({
      x: from.x + (progress * (to.x - from.x)),
      y: from.y + (progress * (to.y - from.y))
    });
  }

  render() {
    return (
      <div ref="positionShiftElement" className="position-shift">
        {this.props.children}
      </div>
    );
  }
}

PositionShiftComponent.displayName = 'PositionShiftComponent';

PositionShiftComponent.propTypes = {
  game: React.PropTypes.object.isRequired
};

export default PositionShiftComponent;

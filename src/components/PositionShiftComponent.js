'use strict';

import React from 'react';

class PositionShiftComponent extends React.Component {
  componentDidMount() {
    this.transform(this.props.game);
  }

  componentDidUpdate(prevProps) {
    if ((prevProps.game.x === this.props.game.x) && (prevProps.game.y === this.props.game.y)) { return; }
    if (prevProps.game.map !== this.props.game.map) {
      this.transform(this.props.game);
    } else {
      this.updateTileDisplayTransform(prevProps.game, this.props.game);
    }
  }

  transform({x, y}) {
    this.refs.positionShiftElement.style.transform = `translate3d(${80 - x * 16}px, ${80 - y * 16}px, 0px)`;
  }

  updateTileDisplayTransform(from, to) {
    let startTime = performance.now();
    let step = (now) => {
      let progress = Math.min(1, (now - startTime) / 250);
      this.transform({
        x: from.x + (progress * (to.x - from.x)),
        y: from.y + (progress * (to.y - from.y))
      });
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        this.props.onMovementFinished();
      }
    };

    window.requestAnimationFrame(step);

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
  game: React.PropTypes.object.isRequired,
  onMovementFinished: React.PropTypes.func.isRequired
};

export default PositionShiftComponent;

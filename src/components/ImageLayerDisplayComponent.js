'use strict';

import React from 'react';

class ImageLayerDisplayComponent extends React.Component {
  render() {
    let imageUrl = this.props.layer.image;
    return (<img src={'/game/maps/' + imageUrl} />);
  }
}

ImageLayerDisplayComponent.displayName = 'ImageLayerDisplayComponent';

ImageLayerDisplayComponent.propTypes = {
  layer: React.PropTypes.object.isRequired
};

export default ImageLayerDisplayComponent;

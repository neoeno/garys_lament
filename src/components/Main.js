require('normalize.css');
require('styles/App.css');

import React from 'react';
import TileDisplayComponent from './TileDisplayComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <TileDisplayComponent />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

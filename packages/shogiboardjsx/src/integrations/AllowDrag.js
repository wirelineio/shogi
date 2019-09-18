import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Shogiboard from '../Shogiboard';

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */

class AllowDrag extends Component {
  static propTypes = { children: PropTypes.func };

  allowDrag = ({ piece }) => {
    if (piece === 'wB' || piece === 'spare-wB') {
      return false;
    }
    return true;
  };
  render() {
    return this.props.children({ allowDrag: this.allowDrag });
  }
}

export default function AllowDragFeature() {
  return (
    <div className="App">
      <AllowDrag>
        {({ allowDrag }) => (
          <Shogiboard
            id="allowDrag"
            calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
            position="start"
            boardStyle={{
              borderRadius: '5px'
            }}
            dropOffBoard="trash"
            allowDrag={allowDrag}
            draggable={true}
          />
        )}
      </AllowDrag>
    </div>
  );
}

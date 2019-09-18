import React, { Component } from 'react';

import CustomizedBoard from './integrations/CustomizedBoard';
import AllowDragFeature from './integrations/AllowDrag';
import SpareOnDrop from './integrations/SpareOnDrop';

import Shogiboard from './Shogiboard';

class Demo extends Component {
  state = {
    show: 'regular'
  };
  render() {
    const { show } = this.state;
    return (
      <div>
        <div style={buttonRow}>
          <button
            onClick={() => this.setState({show: 'regular'})}
            style={{ ...buttonStyle, ...{ backgroundColor: 'silver' } }}
          >
            Regular Board
          </button>

          <button
            onClick={() => this.setState({show: 'custom'})}
            style={{ ...buttonStyle, ...{ backgroundColor: 'orange' } }}
          >
            Custom Board
          </button>
          <button
            onClick={() => this.setState({show: 'drag'})}
            style={{ ...buttonStyle, ...{ backgroundColor: 'aqua' } }}
          >
            Conditionally Disable Drag
          </button>
          <button
            onClick={() => this.setState({show: 'spare'})}
            style={{ ...buttonStyle, ...{ backgroundColor: 'lightblue' } }}
          >
            Show Spare OnDrop
          </button>
        </div>
        <div style={boardsContainer}>
          {show === 'regular' && <div className="App"><Shogiboard position="start" /></div>}
          {show === 'custom' && <CustomizedBoard />}
          {show === 'drag' && <AllowDragFeature />}
          {show === 'spare' && <SpareOnDrop />}
        </div>
      </div>
    );
  }
}

export default Demo;

const buttonStyle = { width: 160, height: 48, margin: 30, fontSize: 16 };

const buttonRow = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100vw',
  flexWrap: 'wrap'
};

const boardsContainer = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100vw',
  marginTop: 30,
  marginBottom: 50
};

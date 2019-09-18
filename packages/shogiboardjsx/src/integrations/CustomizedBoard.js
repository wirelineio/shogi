import React from 'react';

import Shogiboard from '../Shogiboard';
import { roughSquare } from '../customRough';

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
export default function CustomizedBoard() {
  return (
    <div className="App">
      <Shogiboard
        id="customized"
        calcWidth={({ screenWidth }) => (screenWidth < 500 ? 350 : 480)}
        roughSquare={roughSquare}
        position="start"
        boardStyle={{
          borderRadius: '3px',
        }}
        dropOffBoard="trash"
      />
    </div>
  );
}

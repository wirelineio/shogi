import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import Shogiboard from '../Shogiboard';

function SpareOnDrop() {
  const onDrop = ({ sourceSquare, targetSquare, piece }) => {
    console.log('drop', piece, sourceSquare, targetSquare);
  };

  return (
    <div className="App">
      <Shogiboard sparePieces position="start" onDrop={onDrop} />
    </div>
  );
}

export default SpareOnDrop;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Piece from './Piece';
import Shogiboard from './index';

function SparePiecesTop() {
  return <SparePieces top />;
}

function SparePiecesBottom() {
  return <SparePieces />;
}

class SparePieces extends Component {
  static propTypes = { top: PropTypes.bool };

  static Top = SparePiecesTop;
  static Bottom = SparePiecesBottom;

  getOrientation = orientation => {
    const { top } = this.props;
    if (top) {
      return orientation === 'black' ? 'white' : 'black';
    }
    return orientation === 'black' ? 'black' : 'white';
  };

  render() {
    return (
      <Shogiboard.Consumer>
        {context => {
          const captured = context.position.split(' ')[2];

          const spares = [];

          let i = 0;
          let count = 1;
          while (i < captured.length) {
            const c = captured[i];
            if (Number(c)) {
              count = Number(c);
            } else {
              if ((c.toUpperCase() === c && !this.props.top) ||
                (c.toUpperCase() !== c && this.props.top)) {
                spares.push((this.props.top ? 'b' : 'w') + c.toUpperCase())
              }
            }

            i++;
          }

          return (
            <div style={spareStyles(context.width)}>
              {spares.map(p => (
                <div data-testid={`spare-${p}`} key={p}>
                  <Piece
                    piece={p}
                    width={context.width}
                    setPosition={context.setPosition}
                    square={'spare'}
                    dropOffBoard={context.dropOffBoard}
                    draggable={true}
                    onDrop={context.onDrop}
                    sourceSquare={context.sourceSquare}
                    targetSquare={context.targetSquare}
                    sourcePiece={context.sourcePiece}
                    orientation={context.orientation}
                    manualDrop={context.manualDrop}
                    id={context.id}
                    pieces={context.pieces}
                    wasManuallyDropped={context.wasManuallyDropped}
                    onPieceClick={context.onPieceClick}
                    allowDrag={context.allowDrag}
                  />
                </div>
              ))}
            </div>
          );
        }}
      </Shogiboard.Consumer>
    );
  }
}

export default SparePieces;

const spareStyles = width => ({
  display: 'flex',
  justifyContent: 'center',
  width,
  height: '64px',
  padding: '16px 0',
  // margin: '16px 0',
  backgroundColor: 'rgba(181, 136, 99, .1)'
});

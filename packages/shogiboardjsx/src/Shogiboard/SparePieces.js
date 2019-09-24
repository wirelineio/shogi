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
          while (i < captured.length) {
            const c = captured[i];
            if (!Number(c)) {
              if ((c.toUpperCase() === c && !this.props.top) ||
                (c.toUpperCase() !== c && this.props.top)) {
                spares.push((this.props.top ? 'b' : 'w') + c.toUpperCase());
              }
            }

            i++;
          }

          return (
            <div style={spareContainerStyles(this.props.top, context.width)}>
              <div style={spareStyles(this.props.top, context.width)}>
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
            </div>
          );
        }}
      </Shogiboard.Consumer>
    );
  }
}

export default SparePieces;

const spareContainerStyles = (top, width) => ({
  display: 'flex',
  flexDirection: 'row' + (top ? '' : '-reverse'),
  width: `${Math.floor(width / 6)}px`,
  padding: '0 6px',
  backgroundColor: 'rgba(181, 136, 99, .1)'
});

const spareStyles = (top) => ({
  display: 'flex',
  flexDirection: 'column' + (top ? '' : '-reverse'),
});

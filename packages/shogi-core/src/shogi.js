//
// Copyright 2019 Wireline, Inc.
//

// TODO(burdon): Fork or patch.

import { Shogi as Game, Color } from 'shogi.js';

function position(square) {

  // TODO(burdon): BUG: shogiboardjsx coordinates are inverted.
  if (typeof square === 'string') {
    return {
      x: 10 - ('abcdefghi'.indexOf(square[0]) + 1),
      y: 10 - Number(square[1])
    }
  } else {
    return square;
  }
}

const sfenPiece = {
  FU: 'P', // Pawn
  KY: 'L', // Lance
  KE: 'N', // kNight
  GI: 'S', // Silver
  KI: 'G', // Gold
  KA: 'B', // Bishop
  HI: 'R', // Rook
  OU: 'K', // King
};

const promoted = {
  TO: 'FU',
  NY: 'KY',
  NK: 'KE',
  NG: 'GI',
  UM: 'KA',
  RY: 'HI',
};

// TODO(burdon): Handle promoted pieces.
function pieceToSFEN(color, kind) {
  const p = promoted[kind];
  const str = sfenPiece[p || kind];
  return (p ? '+' : ' ') + ((color === Color.Black) ? str.toLowerCase() : str);
}

/**
 * Wrapper.
 */
export class Shogi {

  static INIT = 'lnsgkgsnl/1r5b1/ppppppppp/9/9/9/PPPPPPPPP/1B5R1/LNSGKGSNL b - 1';

  _game = new Game();

  constructor(sfen) {
    if (sfen) {
      this._game.initializeFromSFENString(sfen);
    }
  }

  get turn() {
    return this._game.turn;
  }

  toSFEN() {
    return this._game.toSFENString();
  }

  ascii() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      board.push('.........'.split('').map(i => ' ' + i));
    }

    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        const square = this._game.get(x, y);
        if (square) {
          board[y - 1][9 - x] = pieceToSFEN(square.color, square.kind);
          // console.log(x, y, square)
        }
      }
    }

    return board.map(line => line.join(' ')).join('\n');
  }

  move(sourceSquare, targetSquare) {
    const { x:x1, y:y1 } = position(sourceSquare);
    const { x:x2, y:y2 } = position(targetSquare);

    try {
      this._game.move(x1, y1, x2, y2);
      return true;
    } catch (ex) {
      return false;
    }
  }

  getMoves() {
    const moves = [];

    // TODO(burdon): Bug: allows king to move into check.
    for (let x = 1; x <= 9; x++) {
      for (let y = 1; y <= 9; y++) {
        const square = this._game.get(x, y);
        if (square && square.color === this._game.turn) {
          this._game.getMovesFrom(x, y).forEach(move => {
            moves.push(move);
          })
        }
      }
    }

    return moves;
  }
}

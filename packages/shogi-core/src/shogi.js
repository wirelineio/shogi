//
// Copyright 2019 Wireline, Inc.
//

// TODO(burdon): Fork or patch.

import { Shogi as Game } from 'shogi.js';

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

/**
 * Wrapper.
 */
export class Shogi {

  _game = new Game();

  toSFEN() {
    return this._game.toSFENString();
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

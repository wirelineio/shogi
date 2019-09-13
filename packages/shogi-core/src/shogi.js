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
    };
  } else {
    return square;
  }
}

const sfenPiece = {
  'FU': 'P',    // Fu       Pawn
  'KY': 'L',    // Kyu      Lance
  'KE': 'N',    //          kNight
  'GI': 'S',    // Gin      Silver
  'KI': 'G',    // Kin      Gold
  'KA': 'B',    // Kaku     Bishop
  'HI': 'R',    // Hisha    Rook
  'OU': 'K',    // Oo       King
};

const promoted = {
  'TO': 'FU',   // Tokin
  'NY': 'KY',   //
  'NK': 'KE',   //
  'NG': 'GI',   //
  'UM': 'KA',   //
  'RY': 'HI',   // Ryu      Dragon
};

/*
const kanji = {
  'P': '歩',
  'L': '香',
  'N': '桂',
  'S': '銀',
  'G': '金',
  'B': '角',
  'R': '飛',
  'K': '王',     // 玉
};
*/

// TODO(burdon): Handle promoted pieces.
function pieceToSFEN(color, kind) {
  const p = promoted[kind];
  const str = sfenPiece[p || kind];
  return (p ? '+' : ' ') + ((color === Color.Black) ? str : str.toLowerCase());
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

  // TODO(burdon): Use kanji and colors? (need fixed width).
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
        }
      }
    }

    return board.map(line => line.join(' ')).join('\n');
  }

  move({ from, to }) {
    const { x:x1, y:y1 } = position(from);
    const { x:x2, y:y2 } = position(to);

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
          });
        }
      }
    }

    return moves;
  }
}

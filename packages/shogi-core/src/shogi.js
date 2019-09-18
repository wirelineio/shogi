//
// Copyright 2019 Wireline, Inc.
//

// TODO(burdon): Fork or patch.

import { Shogi as Game, Color } from 'shogi.js';

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

function pieceToSFEN(color, kind) {
  const p = promoted[kind];
  const str = sfenPiece[p || kind];
  return (p ? '+' : ' ') + ((color === Color.Black) ? str : str.toLowerCase());
}

/**
 * (1, 1) is top right.
 *
 * @param square
 * @return {{x: number, y: number}|*}
 */
function position(square) {

  if (typeof square === 'string') {
    return {
      x: 10 - ('abcdefghi'.indexOf(square[0]) + 1),
      y: 10 - Number(square[1])
    };
  } else {
    return square;
  }
}

/**
 * Wrapper.
 */
export class Shogi {

  // TODO(burdon): Black (bottom) should play first.

  static EMPTY = '9/9/9/9/9/9/9/9/9 b - 1';

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

    // TODO(burdon): Letters or numbers?
    const rows = board.map((line, i) => '| ' + line.join(' ') + '  | ' + 'abcdefghi'[i]).join('\n');

    return '   9  8  7  6  5  4  3  2  1\n' +
      '+-----------------------------+\n' + rows +
      '\n+-----------------------------+';
  }

  move({ from, to }) {
    const { x:x1, y:y1 } = position(from);
    const { x:x2, y:y2 } = position(to);

    // Auto-promotion.
    // TODO(burdon): Should depend on orientation of board.
    const promote = ((this._game.turn === Color.Black && y2 <= 3) || (this._game.turn === Color.White && y2 >= 7));

    try {
      this._game.move(x1, y1, x2, y2, promote);

      return {
        from: { x:x1, y:y1 },
        to: { x:x2, y:y2 }
      };
    } catch (ex) {
      return null;
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

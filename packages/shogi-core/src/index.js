//
// Copyright 2019 Wireline, Inc.
//

import Shogi from 'shogi-moves';

/**
 * @typedef Message
 * @type {object}
 * @property {object} from
 * @property {object} to
 * @property {object} drop
 * @property {String} piece
 *
 * @typedef View
 * @type {object}
 * @property {[Message]} log
 * @property {Function} appendChange
 *
 * @typedef Shogi
 * @type {object}
 * @property {Function} drop
 * @property {Function} move
 * @property {Function} sfen
 * @property {Function} ascii
 * @property {Function} getMoves
 * @property {Function} getDrops
 * @property {String} turn
 */

/**
 * State machine shared by pad and bot.
 */
class StateMachine {

  /**
   * Note: this is assumed to be a third-party library.
   * @type {Shogi}
   */
  _game = new Shogi();

  get state() {
    return this._game;
  }

  /**
   * Processes a chess protocol message.
   * @param {from, to, drop, piece} message
   * @return {Shogi}
   */
  applyMessage(message) {
    const { from, to, drop, piece } = message;

    if (drop) {
      this._game.drop({ drop, piece });
    } else {
      this._game.move({ from, to });
    }

    return this._game;
  }

  /**
   * Creates a move protocol message.
   * @param move
   */
  createMessage(move) {
    const { from, to, drop, piece } = move;

    if (drop) {
      return { drop, piece };
    } else {
      return { from, to, piece };
    }
  }
}

export { StateMachine as Shogi };

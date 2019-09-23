//
// Copyright 2019 Wireline, Inc.
//

import { LogBot } from '@wirelineio/botkit';

import Shogi from 'shogi-moves';

import { view } from './defs';

export default class ShogiBot extends LogBot {

  constructor(config) {
    super(config, view);
  }

  async handleMetaChange(view) {
    this._makeMove(view);
  }

  async handleUpdate(view) {
    this._makeMove(view);
  }

  async _makeMove(view) {
    const game = new Shogi();
    view.log.forEach(({ from, to }) => game.move({ from, to }));
    console.log(game.ascii());

    const moves = game.getMoves();
    // Play only whites.
    if (view.log.length % 2 === 0 && moves.length) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const { from, to } = game.move(move);
      view.appendChange({ from, to });
    }
  }
}

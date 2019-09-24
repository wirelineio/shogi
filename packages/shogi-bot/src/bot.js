//
// Copyright 2019 Wireline, Inc.
//

import Shogi from 'shogi-moves';

import { LogBot } from '@wirelineio/botkit';

import { view } from './defs';

export default class ShogiBot extends LogBot {

  constructor(config) {
    super(config, view);
  }

  async handleUpdate(view) {
    const game = new Shogi();
    view.log.forEach(({ from, to }) => game.move({ from, to }));
    console.log(game.ascii());

    const moves = game.getMoves();
    if (moves.length) {
      const move = moves[Math.floor(Math.random() * moves.length)];
      const { from, to } = game.move(move);
      view.appendChange({ from, to });
    }
  }
}

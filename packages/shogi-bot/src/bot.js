//
// Copyright 2019 Wireline, Inc.
//

import { LogBot } from '@wirelineio/botkit';

import { Shogi } from '@wirelineio/shogi-core';

import { view } from './defs';

export default class ShogiBot extends LogBot {

  constructor(config) {
    super(config, view);
  }

  /**
   * @param {View} view
   */
  async handleUpdate(view) {
    const game = new Shogi();
    view.log
      .sort((a, b) => a.seq - b.seq)
      .forEach(message => game.applyMessage(message));

    // TODO(burdon): Consider drops.
    const moves = game.state.getMoves();
    if (moves.length) {
      const move = moves[Math.floor(Math.random() * moves.length)];

      const message = game.createMessage(move);
      game.applyMessage(message);

      await view.appendChange(message);
    }

    console.log('\n' + game.state.ascii());
  }
}

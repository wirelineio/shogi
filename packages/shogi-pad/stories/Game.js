//
// Copyright 2019 Wireline, Inc.
//

import React, { Component } from 'react';
import { button } from '@storybook/addon-knobs';

import Shogiboard from 'shogiboardjsx';
import Shogi from 'shogi-moves';

export default class Game extends Component {

  state = {
    // https://en.wikipedia.org/wiki/Shogi_notation
    // game: new Shogi(Shogi.INIT)
    game: new Shogi('ln1g5/1r2S1k2/p2pppn2/2ps2p2/1p7/2P6/PPSPPPPLP/2G2K1pr/LN4G1+b w BGSLPnp')
  };

  constructor() {
    super(...arguments);

    // TODO(burdon): Bug: called multiple times if WDS reloads.
    button('Suggest', () => {
      this.suggest();
      return false;
    });
  }

  suggest() {
    const { game } = this.state;

    let move = null;
    const drops = game.getDrops();
    if (drops.length) {
      const { drop, piece } = drops[ Math.floor(drops.length * Math.random()) ];
      move = game.drop({ to: drop, piece });
    }

    if (!move) {
      const moves = game.getMoves();
      if (moves.length) {
        const { from, to } = moves[ Math.floor(moves.length * Math.random()) ];
        move = game.move({ from, to });
      }
    }

    if (move) {
      this.setState({ game });
    }
  }

  handleDrop = ({ sourceSquare: from, targetSquare: to, piece }) => {
    const { game } = this.state;

    const move = (from === 'spare') ?
      game.drop({ to, piece: piece[1] }) :
      game.move({ from, to });

    if (move) {
      this.setState({ game });
    }
  };

  render() {
    const { game } = this.state;

    console.log('Player:', game.turn ? 'White' : 'Black');
    console.log(game.ascii());

    return (
      <div>
        <Shogiboard
          position={game.sfen()}
          sparePieces={true}
          onDrop={this.handleDrop}
        />
      </div>
    );
  }
}

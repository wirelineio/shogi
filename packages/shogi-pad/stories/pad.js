//
// Copyright 2019 Wireline, Inc.
//

import React, { Component } from 'react';

import { Shogi } from '@wirelineio/shogi-core';

console.log(':::', Shogi)

// TODO(burdon): Change domain.
import Shogiboard from '@wirelineio/shogiboardjsx';

export default class ShogiPad extends Component {

  // TODO(burdon): Doesn't handle captures or drops.

  state = {
    game: new Shogi()
  };

  handleDrop = ({ sourceSquare: from, targetSquare: to }) => {
    const { game } = this.state;

    if (game.move(from, to)) {
      this.setState({ game });
    }
  };

  handleSuggest = () => {
    const { game } = this.state;

    const moves = game.getMoves();
    const { from, to } = moves[Math.floor(moves.length * Math.random())];

    if (game.move(from, to)) {
      this.setState({ game });
    }
  };

  render() {
    const { game } = this.state;

    return (
      <div>
        <Shogiboard position={game.toSFEN()} onDrop={this.handleDrop} />
        <button onClick={this.handleSuggest}>Suggest</button>
      </div>
    );
  }
}

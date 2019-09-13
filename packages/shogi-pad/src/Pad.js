//
// Wireline SDK
//

import React, { Component } from 'react';

import { withLogView } from '@wirelineio/appkit';

import { Shogi } from '@wirelineio/shogi-core';

// TODO(burdon): Change domain.
import Shogiboard from '@wirelineio/shogiboardjsx';

import Defs from './defs';

/**
 * The Pad component is wrapped by the `withLogView`
 * higher-order-component, which injects the `view` property.
 */
class Pad extends Component {

  static getDerivedStateFromProps(props, state) {
    const { view } = props;

    if (state.local) {
      return { local: false };
    }

    const game = new Shogi();
    view.log.forEach(({ from, to }) => game.move({ from, to }));
    return { game };
  }

  state = {
    game: new Shogi()
  };

  handleDrop = ({ sourceSquare: from, targetSquare: to }) => {
    const { game } = this.state;
    const move = game.move({ from, to });

    if (move) {
      const { from, to } = move;
      this.setState({ game, local: true }, () => {
        this.props.view.appendChange({ from, to });
      });
    }
  };

  render() {
    const { game } = this.state;

    return (
      <Shogiboard position={game.toSFEN()} onDrop={this.handleDrop} />
    );
  }
}

export default withLogView({ view: Defs.view })(Pad);

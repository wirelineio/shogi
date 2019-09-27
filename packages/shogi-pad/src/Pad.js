//
// Wireline SDK
//

import React, { Component } from 'react';
import { compose } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import { withLogView } from '@wirelineio/appkit';

import { Shogi } from '@wirelineio/shogi-core';

import Shogiboard from 'shogiboardjsx';

import Defs from './defs';

const styles = () => ({

  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

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
    const { classes, maxWidth, border = 40 } = this.props;
    const { game } = this.state;

    const calcWidth = () => {
      if (!this._board) { return 0; }
      const size = Math.min(this._board.offsetWidth, this._board.offsetHeight) - (2 * border);
      return maxWidth ? Math.min(size, maxWidth) : size;
    };



    return (
      <div ref={el => this._board = el} className={classes.root}>
        <Shogiboard
          calcWidth={calcWidth}
          position={game.sfen()}
          sparePieces={true}
          onDrop={this.handleDrop}
        />
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withLogView({ view: Defs.view })
)(Pad);

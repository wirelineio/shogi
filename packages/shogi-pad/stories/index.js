//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Game from './Game';

storiesOf('Components', module)

  .addParameters({ options: { addonPanelInRight: true } })
  .addDecorator(withKnobs)

  .add('Game', () => {
    return <Game />;
  });

//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import ShogiPad from './Pad';

storiesOf('Components', module)

  .addDecorator(withKnobs)

  .add('Test', () => {
    return <ShogiPad />;
  });

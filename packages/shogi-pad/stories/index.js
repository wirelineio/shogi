//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import { storiesOf } from '@storybook/react';

import ShogiPad from './Pad';

storiesOf('Components', module)

  .add('Test', () => {
    return <ShogiPad/>;
  });

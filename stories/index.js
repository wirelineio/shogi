//
// Copyright 2018 Wireline, Inc.
//

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

// TODO(burdon): Change domain.
import Shogiboard from '@wirelineio/shogiboardjsx'

storiesOf('Components', module)

  // https://github.com/storybooks/storybook/tree/master/addons/knobs
  .addDecorator(withKnobs)

  // https://storybook.js.org/docs/configurations/options-parameter
  .addParameters({
    options: {
      panelPosition: 'right'
    }
  })

  .add('Test', () => {
    return (
      <div>
        <Shogiboard position="start" />
      </div>
    );
  });

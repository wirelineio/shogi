//
// Copyright 2019 Wireline, Inc.
//

import { loadConfig } from '@wirelineio/botkit';

import ShogiBot from './bot';

new ShogiBot(loadConfig({ isBot: true })).start();

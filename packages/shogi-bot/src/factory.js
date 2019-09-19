//
// Copyright 2019 Wireline, Inc.
//

import { BotFactory, loadConfig, getBotConfig } from '@wirelineio/botkit';

new BotFactory(loadConfig(), [{ name: getBotConfig().id, file: './src/main.js' }]).start();

//
// Copyright 2019 Wireline, Inc.
//

import 'source-map-support/register';

import { BotFactory, HttpHandler, Util } from '@wirelineio/botkit';
import Wireline from '@wirelineio/sdk';

import { ShogiBot } from './src/bot';

const bot = BotFactory.createBot(ShogiBot);

module.exports = {

  info: Wireline.exec(async event => {
    return await HttpHandler.info(event, await bot);
  }),

  dump: Wireline.exec(async event => {
    let { dir } = event.queryStringParameters || {};

    return await Util.dump(await bot, dir);
  }),

  join: Wireline.exec(async event => {
    let { partyKey } = event.queryStringParameters || {};

    let shogiBot = await bot;

    return shogiBot.joinParty(partyKey);
  }),

  start: Wireline.exec(async event => {
    let { partyKey } = event.queryStringParameters || {};

    return await bot.then(bot => bot.startGame(partyKey));
  })
};

//
// Copyright 2019 Wireline, Inc.
//

import { Shogi } from './';

test('ASCII output', () => {
  const game = new Shogi('+lk7/9/9/9/9/9/9/9/8K b - 1');

  const ascii1 = game.state.ascii();
  console.log(ascii1);

  const move = game.state.move({ from: { x: 1, y: 9 }, to: { x: 1, y: 8 } });
  expect(move).not.toBeNull();

  const ascii2 = game.state.ascii();
  console.log(ascii2);

  expect(ascii1).not.toBe(ascii2);
});

test('Proto moves', () => {
  const game = new Shogi('ln1g5/1r2S1k2/p2pppn2/2ps2p2/1p7/2P6/PPSPPPPLP/2G2K1pr/LN4G1+b w BGSLPnp');
  const sfen1 = game.state.sfen();
  console.log(game.state.ascii());

  const moves = game.state.getMoves();
  expect(moves).toHaveLength(34);

  const message = game.createMessage(moves[0]);
  console.log(JSON.stringify(message));
  game.applyMessage(message);
  console.log(game.state.ascii());

  const sfen2 = game.state.sfen();
  expect(sfen1).not.toEqual(sfen2);
});

test('Proto drops', () => {
  const game = new Shogi('ln1g5/1r2S1k2/p2pppn2/2ps2p2/1p7/2P6/PPSPPPPLP/2G2K1pr/LN4G1+b w BGSLPnp');
  const sfen1 = game.state.sfen();
  console.log(game.state.ascii());

  const moves = game.state.getDrops();
  expect(moves).toHaveLength(44);

  const message = game.createMessage(moves[0]);
  console.log(JSON.stringify(message));
  game.applyMessage(message);
  console.log(game.state.ascii());

  const sfen2 = game.state.sfen();
  expect(sfen1).not.toEqual(sfen2);
});

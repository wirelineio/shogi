//
// Copyright 2019 Wireline, Inc.
//

import Shogi from './';

test('ASCII output', () => {
  const game = new Shogi('+lk7/9/9/9/9/9/9/9/8K b - 1');

  const ascii1 = game.ascii();
  console.log(ascii1);

  const move = game.move({ from: { x: 1, y: 9 }, to: { x: 1, y: 8 } });
  expect(move).not.toBeNull();

  const ascii2 = game.ascii();
  console.log(ascii2);

  expect(ascii1).not.toBe(ascii2);
});

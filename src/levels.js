import Brick01 from "/src/brick01";
import Brick02 from "/src/brick02";

export function buildLevel(game, level) {
  let bricks01 = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick01, brick01Index) => {
      if (brick01 === 1) {
        let position = {
          x: 80 * brick01Index,
          y: 75 + 24 * rowIndex
        };
        bricks01.push(new Brick01(game, position));
      }
    });
  });

  return bricks01;
}

export const level1 = [
  [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

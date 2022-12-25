const COLS = 13;
const ROWS = 19;
const BLOCK_SIZE = 30;

const COLOR_MAPPING = [
  "white",
  "orange",
  "green",
  "red",
  "purple",
  "blue",
  "yellow",
  "cyan",
];
const BRICK_LAYOUT = [
  // 0 - L
  [
    [
      [0, 0, 1], //     #
      [1, 1, 1], // # # #
      [0, 0, 0], //
    ],
    [
      [0, 1, 0], //   #
      [0, 1, 0], //   #
      [0, 1, 1], //   # #
    ],
    [
      [0, 0, 0], //
      [1, 1, 1], // # # #
      [1, 0, 0], // #
    ],
    [
      [1, 1, 0], // # #
      [0, 1, 0], //   #
      [0, 1, 0], //   #
    ],
  ],
  // 1 - L reverse
  [
    [
      [1, 0, 0], // #
      [1, 1, 1], // # # #
      [0, 0, 0], //
    ],
    [
      [0, 1, 1], //   # #
      [0, 1, 0], //   #
      [0, 1, 0], //   #
    ],
    [
      [0, 0, 0], //
      [1, 1, 1], // # # #
      [0, 0, 1], //     #
    ],
    [
      [0, 1, 0], //   #
      [0, 1, 0], //   #
      [1, 1, 0], // # #
    ],
  ],
  // 2 - Square
  [
    [
      [1, 1], // # #
      [1, 1], // # #
    ],
    [
      [1, 1], // # #
      [1, 1], // # #
    ],
    [
      [1, 1], // # #
      [1, 1], // # #
    ],
    [
      [1, 1], // # #
      [1, 1], // # #
    ],
  ],
  // 3 - Z
  [
    [
      [1, 1, 0], // # #
      [0, 1, 1], //   # #
      [0, 0, 0], //
    ],
    [
      [0, 0, 1], //     #
      [0, 1, 1], //   # #
      [0, 1, 0], //   #
    ],
    [
      [1, 1, 0], // # #
      [0, 1, 1], //   # #
      [0, 0, 0], //
    ],
    [
      [0, 0, 1], //     #
      [0, 1, 1], //   # #
      [0, 1, 0], //   #
    ],
  ],
  // 4 - Z reverse
  [
    [
      [0, 1, 1], //   # #
      [1, 1, 0], // # #
      [0, 0, 0], //
    ],
    [
      [1, 0, 0], // #
      [1, 1, 0], // # #
      [0, 1, 0], //   #
    ],
    [
      [0, 1, 1], //   # #
      [1, 1, 0], // # #
      [0, 0, 0], //
    ],
    [
      [1, 0, 0], // #
      [1, 1, 0], // # #
      [0, 1, 0], //   #
    ],
  ],
  // 5 - Arrow
  [
    [
      [0, 1, 0], //   #
      [1, 1, 1], // # # #
      [0, 0, 0], //
    ],
    [
      [0, 1, 0], //   #
      [0, 1, 1], //   # #
      [0, 1, 0], //   #
    ],
    [
      [0, 0, 0], //
      [1, 1, 1], // # # #
      [0, 1, 0], //   #
    ],
    [
      [0, 1, 0], //   #
      [1, 1, 0], // # #
      [0, 1, 0], //   #
    ],
  ],
  // 6 - Line
  [
    [
      [0, 0, 0], //
      [1, 1, 1], // # # #
      [0, 0, 0], //
    ],
    [
      [0, 1, 0], //   #
      [0, 1, 0], //   #
      [0, 1, 0], //   #
    ],
    [
      [0, 0, 0], //
      [1, 1, 1], // # # #
      [0, 0, 0], //
    ],
    [
      [0, 1, 0], //   #
      [0, 1, 0], //   #
      [0, 1, 0], //   #
    ],
  ],
];
const WHITE_COLOR_ID = 0;
const KEY_CODE = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

// local storage
const STORAGE_KEY = "puzzle-key";
const scoreStorage = {
  fetch: function () {
    const scoreData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return scoreData;
  },
  save: function (scoreData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scoreData));
  },
};
const scoreData = scoreStorage.fetch();

export default {
  COLS: COLS,
  ROWS: ROWS,
  BLOCK_SIZE: BLOCK_SIZE,
  COLOR_MAPPING: COLOR_MAPPING,
  BRICK_LAYOUT: BRICK_LAYOUT,
  WHITE_COLOR_ID: WHITE_COLOR_ID,
  KEY_CODE: KEY_CODE,
  scoreStorage: scoreStorage,
  scoreData: scoreData,
};

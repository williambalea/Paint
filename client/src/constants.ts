export enum NB {
  MinusOne = -1,
  Zero = 0,
  ZeroPointOne = 0.1,
  ZeroPointSeventeen = 0.17,
  ZeroPointThirtyFour = 0.34,
  ZeroPointThree = 0.3,
  ZeroPointTwentyOne = 0.21,
  ZeroPointTwentyFive = 0.25,
  ZeroPointFive = 0.5,
  ZeroPointFiftyOne = 0.51,
  ZeroPointSixtyEight = 0.68,
  ZeroSeventyFive = 0.75,
  ZeroPointEightyFive = 0.85,
  One = 1,
  OnePointTwo = 1.2,
  OnePointFive = 1.5,
  Two = 2,
  TwoPointOne = 2.1,
  TwoPointFive = 2.5,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Ten = 10,
  Eleven = 11,
  Twelve = 12,
  Fourteen = 14,
  Fifteen = 15,
  Sixteen = 16,
  Seventeen = 17,
  Twenty = 20,
  TwentyFour = 24,
  TwentyFive = 25,
  Forty = 40,
  FortyTwo = 42,
  Fifty = 50,
  Sixty = 60,
  SixtyTwo = 62,
  SixtyFour = 64,
  SeventyFour = 74,
  Eighty = 80,
  OneHundred = 100,
  OneHundredEightTwo = 182,
  TwoHundred = 200,
  TwoHundredThree = 203,
  TwoHundredFifty = 250,
  TwoHundredFiftyFive = 255,
  ThreeHundred = 300,
  FourHundred = 400,
  FourHundredOne = 401,
  FourHundredNinety = 490,
  FiveHundred = 500,
  FiveHundredOne = 501,
  SixHundred = 600,
  SixHundredFifty = 650,
  NineHundred = 900,
  OneThousand = 1000,
  TenThousand = 10000,
  }

export enum KEY {
  shift = 'Shift',
  o = 'o',
  c = 'c',
  w = 'w',
  one = '1',
  r = 'r',
}

export enum TOOL {
  rectangle,
  brush,
  pen,
  colorApplicator,
}

export enum BRUSH {
  chalk = 'chalk',
  smear = 'smear',
  rough = 'rough',
  smooth = 'smooth',
  bubbly = 'bubbly',
}

export enum STRING_NB {
  One = '1',
}

export enum RECTANGLE_TYPE {
  bordered = 'Bordered',
  filled = 'Filled',
  borderedAndFilled = 'Bordered & Filled',
}

export enum STRINGS {
  white = 'white',
  canvas = 'canvas',
  twoD = '2d',
}

export enum COLORS {
  whiteRGBA = 'rgba(255,255,255,1)',
  whiteRGBATransparent = 'rgba(255,255,255,0)',
  whiteHEX = 'FFFFFF',
  blackRGBA = 'rgba(0,0,0,1)',
  blackRGBATransparent = 'rgba(0,0,0,0)',
  redRGBA = 'rgba(255, 0, 0, 1)',
  yellowRBGA = 'rgba(255, 255, 0, 1)',
  greenRBGA = 'rgba(0, 255, 0, 1)',
  cyanRBGA = 'rgba(0, 255, 255, 1)',
  blueRGBA = 'rgba(0, 0, 255, 1)',
  magentaRBGA = 'rgba(255, 0, 255, 1)',
}

export const EMPTY_STRING = '';
export const HIDE_DIALOG = 'hideDialog';
export const INIT_MOVE_PEN = 'l0.01 0.01 ';
export const INIT_MOVE_BRUSH = 'l1 1 ';

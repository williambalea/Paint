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
  Nine = 9,
  Ten = 10,
  Eleven = 11,
  Twelve = 12,
  Fourteen = 14,
  Fifteen = 15,
  Sixteen = 16,
  Seventeen = 17,
  Nineteen = 19,
  Twenty = 20,
  TwentyThree = 23,
  TwentyFour = 24,
  TwentyFive = 25,
  Thirty = 30,
  Forty = 40,
  FortyTwo = 42,
  Fifty = 50,
  Sixty = 60,
  SixtyTwo = 62,
  SixtyFour = 64,
  SeventyFour = 74,
  SeventyFive = 75,
  Eighty = 80,
  OneHundred = 100,
  OneHundredEighty= 180,
  OneHundredEightTwo = 182,
  TwoHundred = 200,
  TwoHundredThree = 203,
  TwoHundredFifty = 250,
  TwoHundredFiftyFive = 255,
  ThreeHundred = 300,
  ThreeHundredSixty = 360,
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

export const SVGinnerWidth = 350;

export enum KEY {
  alt = 'Alt',
  backspace = 'Backspace',
  escape = 'Escape',
  shift = 'Shift',
  control = 'Control',
  c = 'c',
  g = 'g',
  i = 'i',
  l = 'l',
  o = 'o',
  r = 'r',
  s = 's',
  u = 'u',
  e = 'e',
  t = 't',
  y = 'y',
  w = 'w',
  z = 'z',
  Z = 'Z',
  one = '1',
  two = '2',
  three = '3',
  x = 'x',
  v = 'v',
  a = 'a',
  d = 'd',
  delete = 'Delete',
  enter = 'Enter',
  plus = '+',
  minus = '-',
}

export const FONTS = ['Arial', 'Roboto', 'Times New Roman', 'Courier New', 'Georgia', 'Palatino', 'Comic Sans MS', 'Impact'];
export const FONTSIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72];
export enum FONTALIGN {
  left = 'Left',
  center = 'Center',
  right = 'Right',
}

export enum TOOL {
  rectangle = 'rectangle',
  brush = 'brush',
  pipette = 'pipette',
  pencil = 'pencil',
  colorApplicator = 'colorApplicator',
  stamp = 'stamp',
  grid = 'grid',
  polygon = 'polygon',
  ellipse = 'ellipse',
  selector = 'selector',
  line = 'line',
  text = 'text',
  eraser = 'eraser',
  pen = 'pen',
  clipboard = 'clipboard',
  noTool = ' noTool',
}

export enum BRUSH {
  chalk = 'chalk',
  smear = 'smear',
  rough = 'rough',
  smooth = 'smooth',
  bubbly = 'bubbly',
}

export enum LINECORNER {
  dot = 'dot',
  angled = 'miter',
  rounded = 'round',
}

export enum JUNCTIONSTYLE {
  dot = 'Dot',
  angled = 'Angled',
  rounded = 'Round',

}

export enum STRING_NB {
  One = '1',
}

export enum POINTER_EVENT {
  none = 'none',
  visiblePainted = 'visiblePainted',
}

export enum OUTLINE_TYPE {
  bordered = 'Bordered',
  filled = 'Filled',
  borderedAndFilled = 'Bordered & Filled',
}

export enum LINE_PATTERN {
  full = 'Full',
  dottedPoint = 'Dotted point',
  dottedLine = 'Dotted line',
}

export enum STROKE_DASHARRAY_STYLE {
  dottedPoint = '1,20',
  dottedLine = '20,20',
  fullLine = '',
}

export enum ACTIONS {
  append = 'append',
  changeColor = 'changeColor',
  remove = 'remove',
  removeMany = 'removeMany',
}

export enum STRINGS {
  white = 'white',
  canvas = 'canvas',
  twoD = '2d',
  areYouSure = 'Are you sure ?',
  cantSaveToServer = 'could not save to server',
  serverNotAvailable = 'Server not available',
  unableToGetPicture = 'unable to get picture, please choose another one',
  bold = 'bold',
  italic = 'italic',
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
  centerGrey = '848484',
}

export const BASE_URL = 'http://localhost:3000';
export const DATABASE_URL = '/database';
export const SVGTABLE_URL = '/svgTable';
export const POST_TABLE_URL = '/postToTable';

export const EMPTY_STRING = '';
export const HIDE_DIALOG = 'hideDialog';
export const INIT_MOVE_PEN = 'l0.01 0.01 ';
export const INIT_MOVE_BRUSH = 'l1 1 ';

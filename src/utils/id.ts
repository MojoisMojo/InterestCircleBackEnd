// 将0-9a-zA-Z转换为0-9a-zA-Z的加密映射
const encodeDict = {
  '0': 'k',
  '1': 'C',
  '2': 'l',
  '3': 'L',
  '4': 'Y',
  '5': 'T',
  '6': '3',
  '7': 'R',
  '8': 's',
  '9': 'D',
  a: '1',
  b: '9',
  c: 'n',
  d: 'V',
  e: '2',
  f: 'X',
  g: 'W',
  h: 'J',
  i: 'z',
  j: 't',
  k: '7',
  l: 'M',
  m: '8',
  n: '4',
  o: 'i',
  p: 'U',
  q: 'I',
  r: 'd',
  s: 'F',
  t: 'O',
  u: '0',
  v: 'G',
  w: 'j',
  x: 'c',
  y: 'f',
  z: 'S',
  A: 'y',
  B: 'K',
  C: 'Q',
  D: 'q',
  E: 'B',
  F: 'E',
  G: 'e',
  H: 'v',
  I: 'P',
  J: 'w',
  K: 'p',
  L: 'h',
  M: 'u',
  N: 'Z',
  O: 'b',
  P: '6',
  Q: 'N',
  R: 'g',
  S: 'a',
  T: 'A',
  U: 'o',
  V: 'x',
  W: 'H',
  X: '5',
  Y: 'm',
  Z: 'r',
};

const decodeDict = {
  '0': 'u',
  '1': 'a',
  '2': 'e',
  '3': '6',
  '4': 'n',
  '5': 'X',
  '6': 'P',
  '7': 'k',
  '8': 'm',
  '9': 'b',
  a: 'S',
  b: 'O',
  c: 'x',
  d: 'r',
  e: 'G',
  f: 'y',
  g: 'R',
  h: 'L',
  i: 'o',
  j: 'w',
  k: '0',
  l: '2',
  m: 'Y',
  n: 'c',
  o: 'U',
  p: 'K',
  q: 'D',
  r: 'Z',
  s: '8',
  t: 'j',
  u: 'M',
  v: 'H',
  w: 'J',
  x: 'V',
  y: 'A',
  z: 'i',
  A: 'T',
  B: 'E',
  C: '1',
  D: '9',
  E: 'F',
  F: 's',
  G: 'v',
  H: 'W',
  I: 'q',
  J: 'h',
  K: 'B',
  L: '3',
  M: 'l',
  N: 'Q',
  O: 't',
  P: 'I',
  Q: 'C',
  R: '7',
  S: 'z',
  T: '5',
  U: 'p',
  V: 'd',
  W: 'g',
  X: 'f',
  Y: '4',
  Z: 'N',
};

function mGenerateRandomId(length: number = 8): string {
  let res = '';
  while (res.length < length) {
    res += Math.random().toString(36).slice(2);
  }
  return res.slice(0, length);
}

function mEncode(input: string): string {
  return input;
  return input
    .split('')
    .map(char => encodeDict[char] || char)
    .join('');
}

function mDecode(input: string): string {
  return input;
  return input
    .split('')
    .map(char => decodeDict[char] || char)
    .join('');
}

export { mGenerateRandomId, mEncode, mDecode};

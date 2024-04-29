export const cacheInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const colorForm = [
  '#0079BF',
  '#D29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91',
  '#FFC83D'
]

/* 
  A: ['#ff0000', '#ffcc00'],
  B: ['#0000ff', '#00ffcc'],
  C: ['#00ccff', '#ff3399'],
  D: ['#ff9900', '#6600ff'],
  E: ['#ff00ff', '#ccff00'],
  F: ['#00ff66', '#ff6600'],
  G: ['#ff3399', '#00ccff'],
  H: ['#6600ff', '#ff9900'],
  I: ['#ccff00', '#ff00ff'],
  J: ['#ffcc00', '#ff0000'],
  K: ['#00ffcc', '#0000ff'],
  L: ['#ff6600', '#00ff66'],
  M: ['#00ccff', '#ff3399'],
  N: ['#ff9900', '#6600ff'],
  O: ['#ccff00', '#ff00ff'],
  P: ['#ffcc00', '#ff0000'],
  Q: ['#00ffcc', '#0000ff'],
  R: ['#ff00ff', '#ccff00'],
  S: ['#00ff66', '#ff6600'],
  T: ['#ff3399', '#00ccff'],
  U: ['#6600ff', '#ff9900'],
  V: ['#ccff00', '#ff00ff'],
  W: ['#ffcc00', '#00ffcc'],
  X: ['#ff0000', '#00ccff'],
  Y: ['#0000ff', '#ff9900'],
  Z: ['#00ccff', '#ff00ff']
*/
export const gradients = {
  A: ['#0747a6', '#008da6'],
  B: ['#006644', '#00875a'],
  C: ['#403294', '#0747a6'],
  D: ['#b22865', '#cd5a91'],
  E: ['#cc4223', '#cb7d25'],
  F: ['#0747a6', '#008da6'],
  G: ['#006644', '#00875a'],
  H: ['#403294', '#0747a6'],
  I: ['#b22865', '#cd5a91'],
  J: ['#cc4223', '#cb7d25'],
  K: ['#0747a6', '#008da6'],
  L: ['#006644', '#00875a'],
  M: ['#403294', '#0747a6'],
  N: ['#b22865', '#cd5a91'],
  O: ['#cc4223', '#cb7d25'],
  P: ['#0747a6', '#008da6'],
  Q: ['#006644', '#00875a'],
  R: ['#403294', '#0747a6'],
  S: ['#b22865', '#cd5a91'],
  T: ['#cc4223', '#cb7d25'],
  U: ['#0747a6', '#008da6'],
  V: ['#006644', '#00875a'],
  W: ['#403294', '#0747a6'],
  X: ['#b22865', '#cd5a91'],
  Y: ['#cc4223', '#cb7d25'],
  Z: ['#0747a6', '#008da6']
}

export const transformString = str => {
  const newStr = str.trim()
  let res = ''
  for (const c of newStr) if (c !== ' ') res += c.toLowerCase()
  return res
}

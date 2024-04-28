export const cacheInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const gradients = {
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
}

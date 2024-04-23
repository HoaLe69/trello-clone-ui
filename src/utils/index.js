export const cacheInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

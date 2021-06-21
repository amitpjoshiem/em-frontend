export function readFromStorage(storage, key) {
  const item = storage.getItem(key)
  if (item) return JSON.parse(item)
  return null
}

export function saveToStorage(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export function removeToStorage(storage, key, value) {
  try {
    storage.removeItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

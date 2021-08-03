export function readFromStorage(storage, key) {
  const item = storage.getItem(key)
  if (item) return JSON.parse(item)
  return null
}

export function saveToStorage(storage, key, value) {
  try {
    storage.setItem(key, value)
  } catch (error) {
    console.error(error)
  }
}

export function removeFromStorage(storage, key) {
  try {
    storage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

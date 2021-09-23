export function isEmptyObject(obj) {
  return Boolean(obj) && obj.constructor === Object && Object.entries(obj).length === 0
}

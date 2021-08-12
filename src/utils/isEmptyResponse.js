export function isEmptyResponse(obj) {
  if (obj.length === undefined && Object.keys(obj).length !== 0) {
    return false
  }

  if (obj.length !== undefined && obj.length !== 0) {
    return false
  }

  return true
}

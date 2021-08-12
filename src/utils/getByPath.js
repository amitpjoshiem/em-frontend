export function getByPath(obj, path) {
  const pathArray = path.split('.')
  const field = pathArray.shift()

  if (field && pathArray.length === 0) {
    return obj[field]
  }

  return getByPath(obj[field], pathArray.join('.'))
}

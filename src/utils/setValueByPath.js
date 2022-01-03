export function setValueByPath(object, path, value) {
  const pathKeys = path.split('.')
  const length = pathKeys.length
  for (let i = 0; i < length - 1; i++) {
    const elem = pathKeys[i]
    if (!object[elem]) object[elem] = {}
    object = object[elem]
  }

  object[pathKeys[length - 1]] = value
}

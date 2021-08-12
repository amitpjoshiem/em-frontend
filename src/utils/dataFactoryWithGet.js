import { getByPath } from '@/utils/getByPath'
import { isEmptyResponse } from '@/utils/isEmptyResponse'

export function dataFactoryWithGet(Entity, obj, path, defaultData = {}) {
  try {
    const data = getByPath(obj, path)
    return isEmptyResponse(data) ? defaultData : new Entity(data)
  } catch (e) {
    return new Entity(defaultData)
  }
}

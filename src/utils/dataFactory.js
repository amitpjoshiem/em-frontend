import { isEmptyResponse } from '@/utils/isEmptyResponse'

export function dataFactory(Entity, data = {}, defaultData = {}) {
  return isEmptyResponse(data) ? new Entity(defaultData) : new Entity(data)
}

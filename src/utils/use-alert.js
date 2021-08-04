import { ElNotification } from 'element-plus'

export function useAlert({ title, type, message, offset = 100 }) {
  ElNotification({
    title,
    type,
    message,
    offset,
  })
}

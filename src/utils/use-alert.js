import { ElNotification } from 'element-plus'

export function useAlert({ title, type, message }) {
  ElNotification({
    title,
    type,
    message,
  })
}

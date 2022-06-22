import { ElNotification } from 'element-plus'

export function showErrorResponse(error) {
  ElNotification({
    title: 'Error',
    message: error.message,
    type: 'error',
    dangerouslyUseHTMLString: true,
  })
}

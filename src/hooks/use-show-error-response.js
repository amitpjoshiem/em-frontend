import { ElNotification } from 'element-plus'

export function showErrorResponse(error) {
  if (error.errors.length) {
    const messages = []
    const errors = Object.values(error.errors)
    errors.forEach((items) => {
      if (items.length) {
        items.forEach((item) => {
          messages.push(item)
        })
      } else {
        messages.push(items)
      }
    })

    messages.forEach((message) => {
      setTimeout(function () {
        ElNotification({
          title: 'Error',
          message: message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        })
      }, 100)
    })
  }
  ElNotification({
    title: 'Error',
    message: error.message,
    type: 'error',
    dangerouslyUseHTMLString: true,
  })
}

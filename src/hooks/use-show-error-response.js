import { ElNotification } from 'element-plus'
import { isEqual } from 'lodash-es'

export function showErrorResponse(error) {
  if (!isEqual(error.errors)) {
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
  } else {
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
      dangerouslyUseHTMLString: true,
    })
  }
}

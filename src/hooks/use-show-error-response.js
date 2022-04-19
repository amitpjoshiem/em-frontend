import { ElNotification } from 'element-plus'

export function showErrorResponse(error) {
  let stringError = ''
  Object.values(error).forEach((item) => {
    stringError += '<div class="item-notification">' + item[0] + '</div>'
  })

  ElNotification({
    title: 'Error',
    message: stringError,
    type: 'error',
    dangerouslyUseHTMLString: true,
  })
}

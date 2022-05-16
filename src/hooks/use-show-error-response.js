import { ElNotification } from 'element-plus'

export function showErrorResponse(error) {
  // let stringError = ''
  console.group('error - ', error)
  // Object.values(error).forEach((item) => {
  //   stringError += '<div class="item-notification">' + item[0] + '</div>'
  // })

  ElNotification({
    title: 'Error',
    message: error.message,
    // message: stringError,
    type: 'error',
    dangerouslyUseHTMLString: true,
  })
}

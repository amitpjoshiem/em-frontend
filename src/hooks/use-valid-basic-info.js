import { ElNotification } from 'element-plus'

export function useValidBasicInfo() {
  function validBasicInfo(fields) {
    Object.values(fields).forEach((item) => {
      setTimeout(function () {
        ElNotification({
          title: 'Error',
          message: item[0].message,
          type: 'error',
          dangerouslyUseHTMLString: true,
        })
      }, 100)
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }
  return {
    validBasicInfo,
  }
}

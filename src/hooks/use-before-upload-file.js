import { ElMessage } from 'element-plus'

export function useBeforeUploadFile() {
  const beforeUploadFile = (rawFile) => {
    if (rawFile.type !== 'application/pdf') {
      ElMessage.error('Document must be PDF format!')
      return false
    } else if (rawFile.size / 1024 / 1024 > 20) {
      ElMessage.error('Document size can not exceed 20MB!')
      return false
    }
    return true
  }
  return { beforeUploadFile }
}

import { ElMessage } from 'element-plus'

export function useBeforeUploadFile() {
  const beforeUploadFile = ({ rawFile, rules }) => {
    if (rawFile.type !== 'application/pdf') {
      ElMessage.error(`Document must be ${rules.allowed_types.join()} format!`)
      return false
    } else if (rawFile.size / 1024 / 1024 > rules.maxSize) {
      ElMessage.error(`Document size can not exceed ${rules.maxSize}MB!`)
      return false
    }
    return true
  }
  return { beforeUploadFile }
}

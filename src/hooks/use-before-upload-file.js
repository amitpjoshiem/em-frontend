import { ElMessage } from 'element-plus'

export function useBeforeUploadFile() {
  const beforeUploadFile = ({ rawFile, rules }) => {
    if (rules.allowed_types) {
      const mimeTypes = []
      const extensions = []
      rules.allowed_types.forEach((element) => {
        mimeTypes.push(element.mimy_type)
        extensions.push(element.extension)
      })
      if (!mimeTypes.includes(rawFile.type)) {
        ElMessage.error(`Document must be ${extensions.join()} format!`)
        return false
      }
    }
    if (rawFile.size / 1024 / 1024 > rules.size) {
      ElMessage.error(`Document size can not exceed ${rules.size}MB!`)
      return false
    }
    return true
  }
  return { beforeUploadFile }
}

import { rulesName } from './fields/rules-name'
import { rulesFirstName } from './fields/rules-first-name'
import { rulesLastName } from './fields/rules-last-name'

const rules = {
  name: rulesName,
  first_name: rulesFirstName,
  last_name: rulesLastName,
  custom_type: [
    {
      required: true,
      message: 'Please input custom type',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  type: [
    {
      required: true,
      message: 'Please select file type',
      trigger: 'change',
    },
  ],
}

export { rules }

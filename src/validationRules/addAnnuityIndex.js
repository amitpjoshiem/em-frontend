import { rulesName } from './fields/rules-name'

const rules = {
  name: rulesName,
  insurance_provider: [
    {
      required: true,
      message: 'Please input insurance provider',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  tax_qualification: [
    {
      required: true,
      message: 'Please select tax qualification',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  agent_rep_code: [
    {
      required: true,
      message: 'Please input agent rep code',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  license_number: [
    {
      required: true,
      message: 'Please input license number',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
}

export { rules }

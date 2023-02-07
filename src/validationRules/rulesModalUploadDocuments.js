/* eslint-disable no-useless-escape */
const rules = {
  name: [
    {
      required: true,
      message: 'Please input name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  first_name: [
    {
      required: true,
      message: 'Please input first name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  last_name: [
    {
      required: true,
      message: 'Please input last name',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
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
  description: [
    {
      errorText: 'Please input name',
      required: false,
      trigger: 'change',
      validator: customValidate,
    },
  ],
}

function customValidate(rule, value, callback) {
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

export { rules }

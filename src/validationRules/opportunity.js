import { rulesName } from './fields/rules-name'
import { customNumberValidation } from './use-custom-number-validation'

const rules = {
  close_date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  name: rulesName,
  amount: [
    {
      validator: customNumberValidation,
      trigger: 'blur',
    },
  ],
}

export { rules }

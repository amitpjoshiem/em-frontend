import { rulesEmail } from './fields/rules-email'
import { rulesFirstName } from './fields/rules-first-name'
import { rulesLastName } from './fields/rules-last-name'
import { rulesPhoneRequired } from './fields/rules-phone'

import { customNumberValidation } from './use-custom-number-validation'

const rules = {
  role: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
  ],
  company_id: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
  ],
  first_name: rulesFirstName,
  last_name: rulesLastName,
  email: rulesEmail,
  username: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
  ],
  position: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
  ],
  phone: rulesPhoneRequired,
  npn: [
    {
      required: true,
      validator: customNumberValidation,
    },
    { trigger: 'blur' },
  ],
  advisors: [
    {
      required: true,
      message: 'The field cannot be empty.',
      trigger: 'change',
    },
  ],
}

export { rules }

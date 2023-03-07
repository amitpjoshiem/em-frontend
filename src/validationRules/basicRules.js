/* eslint-disable no-useless-escape */
import { rulesName } from './fields/rules-name'
import { rulesEmail } from './fields/rules-email'
import { rulesBirthday } from './fields/rules-birthday'
import { rulesRetirementDate } from './fields/rules-retirement-date'
import { rulesState } from './fields/rules-state'
import { rulesCity } from './fields/rules-city'
import { rulesZip } from './fields/rules-zip'
import { rulesAddress } from './fields/rules-address'
import { rulesFirstName } from './fields/rules-first-name'
import { rulesLastName } from './fields/rules-last-name'
import { rulesPhone, rulesPhoneRequired } from './fields/rules-phone'

import { customNumberValidation } from './use-custom-number-validation'

const rules = {
  name: rulesName,
  birthday: rulesBirthday,
  email: rulesEmail,
  phone: rulesPhoneRequired,
  retirement_date: rulesRetirementDate,
  state: rulesState,
  city: rulesCity,
  address: rulesAddress,
  zip: rulesZip,
  employment_history: [
    {

      company_name: [
        {
          type: 'string',
          errorText: 'The field cannot be empty',
          required: false,
          trigger: 'change', 
        },
      ],
      occupation: [
        {
          type: 'string',
          errorText: 'The field cannot be empty',
          required: true,
          trigger: 'change',
          validator: customValidate,
        },
      ],
      years: [
        {
          validator: validateNumber,
          trigger: 'change',
          required: true,
        },
      ],

    },
  ],
  // SPOUSE
  spouse: {
    first_name: rulesFirstName,
    last_name: rulesLastName,
    birthday: rulesBirthday,
    email: rulesEmail,
    phone: rulesPhone,
    retirement_date: rulesRetirementDate,
    employment_history: [
      {

        company_name: [
          {
            type: 'string',
            errorText: 'The field cannot be empty',
            required: false,
            trigger: 'change',
          },
        ],
        occupation: [
          {
            type: 'string',
            errorText: 'The field cannot be empty',
            required: true,
            trigger: 'change',
            validator: customValidate,
          },
        ],
        years: [
          {
            validator: validateNumber,
            trigger: 'change',
            required: true,
          },
        ],

      },
    ],
  },
  house: {
    market_value: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    remaining_mortgage_amount: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    monthly_payment: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    total_monthly_expenses: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
}

const employmentHistoryRule = {

  company_name: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: false,
    trigger: 'change',
  },
  occupation: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: true,
    trigger: 'change',
    validator: customValidate,
  },
  years: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: true,
    trigger: 'change',
    validator: customValidate,
  },
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  }

  if (value < 0) {
    callback(new Error('Unsupported negative value'))
  }

  if (Number(value) > 9999999.99) {
    callback(new Error('The value cannot be greater than 9999999.99'))
  }

  if (rule.required && !value) {
    callback(new Error('The field cannot be empty'))
  }

  callback()
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

export { rules, employmentHistoryRule }

/* eslint-disable no-useless-escape */
import { rulesName } from './fields/rules-name'
import { rulesEmail } from './fields/rules-email'
import { rulesBirthday } from './fields/rules-birthday'
import { rulesRetirementDate } from './fields/rules-retirement-date'
import { rulesState } from './fields/rules-state'
import { rulesCity } from './fields/rules-city'
import { rulesZip } from './fields/rules-zip'
import { rulesAddress } from './fields/rules-address'
import { rulesCompanyName } from './fields/rules-company-name'
import { rulesOccupation } from './fields/rules-occupation'
import { rulesYears } from './fields/rules-years'
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
      company_name: rulesCompanyName,
      occupation: rulesOccupation,
      years: rulesYears,
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
        company_name: rulesCompanyName,
        occupation: rulesOccupation,
        years: rulesYears,
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
  company_name: rulesCompanyName,
  occupation: rulesOccupation,
  years: rulesYears,
}

export { rules, employmentHistoryRule }

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
import {
  rulesHousesMarketValue,
  rulesHousesRemainingMortgageAmount,
  rulesHousesMonthlyPayment,
  rulesHousesTotalMonthlyExpenses,
} from './fields/rules-houses'

const employmentHistoryRule = {
  company_name: rulesCompanyName,
  occupation: rulesOccupation,
  years: rulesYears,
}

const housesRule = {
  market_value: rulesHousesMarketValue,
  remaining_mortgage_amount: rulesHousesRemainingMortgageAmount,
  monthly_payment: rulesHousesMonthlyPayment,
  total_monthly_expenses: rulesHousesTotalMonthlyExpenses,
}

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
  employment_history: [employmentHistoryRule],
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
  houses: [housesRule],
}

export { rules, employmentHistoryRule, housesRule }

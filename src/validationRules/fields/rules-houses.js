import { customNumberValidation } from '../use-custom-number-validation'

export const rulesHousesMarketValue = {
  validator: customNumberValidation,
  trigger: 'blur',
}

export const rulesHousesRemainingMortgageAmount = {
  validator: customNumberValidation,
  trigger: 'blur',
}

export const rulesHousesMonthlyPayment = {
  validator: customNumberValidation,
  trigger: 'blur',
}

export const rulesHousesTotalMonthlyExpenses = {
  validator: customNumberValidation,
  trigger: 'blur',
}

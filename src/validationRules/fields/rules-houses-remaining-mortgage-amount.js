import { customNumberValidation } from './use-custom-number-validation'

export const rulesHousesRemainingMortgageAmount = {
  validator: customNumberValidation,
  trigger: 'blur',
}

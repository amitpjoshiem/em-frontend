import { dontAllowAllSpecialCharacters } from '../use-custom-validation'

export const rulesYears = {
  type: 'string',
  errorText: 'The field cannot be empty.',
  required: true,
  trigger: 'change',
  validator: dontAllowAllSpecialCharacters,
}

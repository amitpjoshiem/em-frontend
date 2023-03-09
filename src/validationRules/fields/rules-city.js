import { dontAllowAllSpecialCharacters } from '../use-custom-validation'

export const rulesCity = {
  errorText: 'The field cannot be empty.',
  required: true,
  trigger: 'change',
  validator: dontAllowAllSpecialCharacters,
  transform(value) {
    return value.trim()
  },
}

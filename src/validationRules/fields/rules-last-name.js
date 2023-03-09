import { dontAllowAllSpecialCharacters } from '../use-custom-validation'

export const rulesLastName = {
  required: true,
  errorText: 'The field cannot be empty.',
  trigger: 'change',
  validator: dontAllowAllSpecialCharacters,
  transform(value) {
    return value.trim()
  },
}

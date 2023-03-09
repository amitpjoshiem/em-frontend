import { dontAllowAllSpecialCharacters } from '../use-custom-validation'

export const rulesName = {
  errorText: 'The field cannot be empty.',
  required: true,
  trigger: 'change',
  validator: dontAllowAllSpecialCharacters,
  transform(value) {
    return value.trim()
  },
}

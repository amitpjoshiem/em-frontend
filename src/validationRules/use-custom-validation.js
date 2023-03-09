/* eslint-disable no-useless-escape */
function dontAllowAllSpecialCharacters(rule, value, callback) {
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

function allowApostropheSpecialCharacters(rule, value, callback) {
  if (/[^\w|\/,\(\)\-|\s|`'"]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

export { dontAllowAllSpecialCharacters, allowApostropheSpecialCharacters }

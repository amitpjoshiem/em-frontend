function customNumberValidation(rule, value, callback) {
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

export { customNumberValidation }

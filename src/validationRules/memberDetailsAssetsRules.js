const rules = {
  liquidity: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  growth: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  income: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  } else {
    callback()
  }
}

export { rules }

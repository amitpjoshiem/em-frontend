const rules = {
  current_member: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  current_spouse: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  current_pensions: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  current_rental_income: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  current_investment: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  future_member: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  future_spouse: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  future_pensions: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  future_rental_income: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  future_investment: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  tax: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  ira_first: [
    {
      validator: validateNumber,
      trigger: 'change',
      required: false,
    },
  ],
  ira_second: [
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

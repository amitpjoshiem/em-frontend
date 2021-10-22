const rules = {
  montly: {
    member_current: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    member_future: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    spouse_current: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    spouse_future: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    rental_current: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    pensions_current: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    pensions_future: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    rental_future: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    investments_current: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    investments_future: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
  },
  total: {
    tax: [
      {
        validator: validateNumber,
        trigger: 'change',
        required: false,
      },
    ],
    ira: [
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
  },
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  } else {
    callback()
  }
}

export { rules }

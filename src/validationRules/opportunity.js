const rules = {
  // stage: [
  //   {
  //     required: true,
  //     message: 'Please select stage',
  //     trigger: 'change',
  //   },
  // ],
  // close_date: [
  //   {
  //     type: 'date',
  //     required: true,
  //     message: 'Please pick a date',
  //     trigger: 'change',
  //   },
  // ],
  opportunity_name: [
    {
      required: true,
      message: 'Please input opportunity name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  // type: [
  //   {
  //     required: true,
  //     message: 'Please select type',
  //     trigger: 'change',
  //   },
  // ],
  amount: [
    {
      validator: validateNumber,
      trigger: 'blur',
    },
  ],
}

function validateNumber(rule, value, callback) {
  // if (!value) {
  //   callback(new Error('The field cannot be empty'))
  // }
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  } else {
    callback()
  }
}

export { rules }

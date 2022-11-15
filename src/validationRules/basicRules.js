const rules = {
  name: [
    {
      required: true,
      message: 'Please input prospect name',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  birthday: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  email: [
    { required: true, message: 'The field cannot be empty', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter valid email ID',
      trigger: 'blur',
    },
  ],
  phone: [{ required: true, len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
  retirement_date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'blur',
    },
  ],
  state: [
    {
      required: true,
      message: 'Please input prospect state',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  city: [
    {
      required: true,
      message: 'Please input prospect city',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  address: [
    {
      required: true,
      message: 'Please input prospect address',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],

  zip: [{ type: 'string', required: true, len: 5, message: 'Invalid zip', trigger: 'blur' }],

  channels: [
    {
      required: true,
      message: 'Please input channels',
      trigger: 'blur',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],

  spouse: {
    name: [
      {
        required: true,
        message: 'Please input spouse name',
        trigger: 'blur',
        transform(value) {
          return value.trim()
        },
      },
      { min: 1, message: 'Length should be min 1', trigger: 'blur' },
    ],
    birthday: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please input email address',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur'],
      },
    ],
    phone: [{ len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
    retirement_date: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'blur',
      },
    ],
    employment_history: [
      {
        company_name: [
          {
            type: 'string',
            required: false,
            message: 'The field cannot be empty',
            trigger: 'blur',
          },
        ],
        occupation: [
          {
            type: 'string',
            required: false,
            message: 'The field cannot be empty',
            trigger: 'blur',
          },
        ],
        years: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: false,
          },
        ],
      },
    ],
  },
  // house: {
  //   market_value: [
  //     {
  //       validator: validateNumber,
  //       trigger: 'blur',
  //       required: true,
  //     },
  //   ],
  //   total_debt: [
  //     {
  //       validator: validateNumber,
  //       trigger: 'blur',
  //       required: true,
  //     },
  //   ],
  //   remaining_mortgage_amount: [
  //     {
  //       validator: validateNumber,
  //       trigger: 'blur',
  //       required: true,
  //     },
  //   ],
  //   monthly_payment: [
  //     {
  //       validator: validateNumber,
  //       trigger: 'blur',
  //       required: true,
  //     },
  //   ],
  //   total_monthly_expenses: [
  //     {
  //       validator: validateNumber,
  //       trigger: 'blur',
  //       required: true,
  //     },
  //   ],
  // },

  employment_history: [
    {
      company_name: [
        {
          type: 'string',
          required: false,
          message: 'The field cannot be empty',
          trigger: 'blur',
        },
      ],
      occupation: [
        {
          type: 'string',
          required: false,
          message: 'The field cannot be empty',
          trigger: 'blur',
        },
      ],
      years: [
        {
          validator: validateNumber,
          trigger: 'blur',
          required: false,
        },
      ],
    },
  ],
}

const employmentHistoryRule = {
  company_name: {
    required: false,
    message: 'Company name can not be null',
    trigger: 'blur',
  },
  occupation: {
    required: false,
    message: 'Occupation can not be null',
    trigger: 'blur',
  },
  years: {
    required: false,
    message: 'Years can not be null',
    trigger: 'blur',
  },
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  }

  if (rule.required && !value) {
    callback(new Error('The field cannot be empty'))
  }

  callback()
}

export { rules, employmentHistoryRule }

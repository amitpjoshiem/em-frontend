const rules = {
  name: [
    {
      required: true,
      message: 'Please input prospect name',
      trigger: 'blur',
    },
    { min: 1, message: 'Length should be min 1', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'The field cannot be empty', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please enter valid email ID',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      type: 'string',
      required: true,
      message: 'The field cannot be empty',
    },
    { len: 14, trigger: 'blur', message: 'Incorrect phone number' },
  ],
  birthday: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'blur',
    },
  ],
  retirement_date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'blur',
    },
  ],

  address: [
    {
      required: true,
      message: 'The field cannot be empty',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  city: [
    {
      required: true,
      message: 'The field cannot be empty',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  state: [
    {
      required: true,
      message: 'The field cannot be empty',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  zip: [
    {
      required: true,
      message: 'The field cannot be empty',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],
  spouse: {
    name: [
      {
        required: true,
        message: 'Please input spouse name',
        trigger: 'blur',
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
    phone: [
      { type: 'string', required: true, message: 'Please spouse phone' },
      { len: 14, trigger: 'blur', message: 'Incorrect phone number' },
    ],
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
            required: true,
            message: 'The field cannot be empty',
            trigger: 'blur',
          },
        ],
        occupation: [
          {
            type: 'string',
            required: true,
            message: 'The field cannot be empty',
            trigger: 'blur',
          },
        ],
        years: [
          {
            validator: validateNumber,
            trigger: 'blur',
            required: true,
          },
        ],
      },
    ],
  },
  house: {
    market_value: [
      {
        validator: validateNumber,
        trigger: 'blur',
        required: true,
      },
    ],
    total_debt: [
      {
        validator: validateNumber,
        trigger: 'blur',
        required: true,
      },
    ],
    remaining_mortgage_amount: [
      {
        validator: validateNumber,
        trigger: 'blur',
        required: true,
      },
    ],
    monthly_payment: [
      {
        validator: validateNumber,
        trigger: 'blur',
        required: true,
      },
    ],
    total_monthly_expenses: [
      {
        validator: validateNumber,
        trigger: 'blur',
        required: true,
      },
    ],
  },

  employment_history: [
    {
      company_name: [
        {
          type: 'string',
          required: true,
          message: 'The field cannot be empty',
          trigger: 'blur',
        },
      ],
      occupation: [
        {
          type: 'string',
          required: true,
          message: 'The field cannot be empty',
          trigger: 'blur',
        },
      ],
      years: [
        {
          validator: validateNumber,
          trigger: 'blur',
          required: true,
        },
      ],
    },
  ],
}

const employmentHistoryRule = {
  company_name: {
    required: true,
    message: 'Company name can not be null',
    trigger: 'blur',
  },
  occupation: {
    required: true,
    message: 'Occupation can not be null',
    trigger: 'blur',
  },
  years: {
    required: true,
    message: 'Years can not be null',
    trigger: 'blur',
  },
}

function validateNumber(rule, value, callback) {
  if (!value) {
    callback(new Error('The field cannot be empty'))
  }
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  } else {
    callback()
  }
}

export { rules, employmentHistoryRule }

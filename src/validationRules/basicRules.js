/* eslint-disable no-useless-escape */
const rules = {
  name: [
    {
      errorText: 'Please input name',
      required: true,
      trigger: 'change',
      validator: customValidate,
    },
  ],
  birthday: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a Date of birth',
      trigger: 'change',
    },
  ],
  email: [
    { required: true, message: 'The field cannot be empty', trigger: 'change' },
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
      message: 'Please pick a Retirement date',
      trigger: 'change',
    },
  ],
  state: [
    {
      required: true,
      message: 'Please input state',
      trigger: 'change',
      transform(value) {
        return value.trim()
      },
    },
    { min: 1, message: 'Length should be min 1', trigger: 'change' },
  ],
  city: [
    {
      errorText: 'Please input city',
      required: true,
      trigger: 'change',
      validator: customValidate,
    },
  ],
  address: [
    {
      errorText: 'Please input address',
      required: true,
      trigger: 'change',
      validator: customValidate,
    },
  ],
  zip: [{ type: 'string', required: true, len: 5, message: 'Invalid zip', trigger: 'blur' }],
  employment_history: [
    {
      company_name: [
        {
          type: 'string',
          errorText: 'The field cannot be empty',
          required: false,
          trigger: 'change',
          validator: customValidate,
        },
      ],
      occupation: [
        {
          type: 'string',
          errorText: 'The field cannot be empty',
          required: false,
          trigger: 'change',
          validator: customValidate,
        },
      ],
      years: [
        {
          validator: validateNumber,
          trigger: 'change',
          required: false,
        },
      ],
    },
  ],

  // SPOUSE
  spouse: {
    first_name: [
      {
        errorText: 'Please input spouse first name',
        required: true,
        trigger: 'change',
        validator: customValidate,
      },
    ],
    last_name: [
      {
        errorText: 'Please input spouse last name',
        required: true,
        trigger: 'change',
        validator: customValidate,
      },
    ],
    birthday: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a Date of birth',
        trigger: 'change',
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
        trigger: 'change',
      },
    ],
    phone: [{ len: 14, trigger: 'blur', message: 'Incorrect phone number' }],
    retirement_date: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a Retirement date',
        trigger: 'change',
      },
    ],
    employment_history: [
      {
        company_name: [
          {
            type: 'string',
            errorText: 'The field cannot be empty',
            required: false,
            trigger: 'change',
            validator: customValidate,
          },
        ],
        occupation: [
          {
            type: 'string',
            errorText: 'The field cannot be empty',
            required: false,
            trigger: 'change',
            validator: customValidate,
          },
        ],
        years: [
          {
            validator: validateNumber,
            trigger: 'change',
            required: false,
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
      },
    ],
    remaining_mortgage_amount: [
      {
        validator: validateNumber,
        trigger: 'blur',
      },
    ],
    monthly_payments: [
      {
        validator: validateNumber,
        trigger: 'blur',
      },
    ],
    total_monthly_expenses: [
      {
        validator: validateNumber,
        trigger: 'blur',
      },
    ],
  },
}

const employmentHistoryRule = {
  company_name: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: false,
    trigger: 'change',
    validator: customValidate,
  },
  occupation: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: false,
    trigger: 'change',
    validator: customValidate,
  },
  years: {
    type: 'string',
    errorText: 'The field cannot be empty',
    required: false,
    trigger: 'change',
    validator: customValidate,
  },
}

function validateNumber(rule, value, callback) {
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

function customValidate(rule, value, callback) {
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

export { rules, employmentHistoryRule }

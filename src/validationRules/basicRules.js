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
    { required: true, message: 'Please input email address', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur'],
    },
  ],
  phone: [
    { type: 'string', required: true, message: 'Please phone' },
    { trigger: 'blur' },
  ],
  birthday: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  retirement_date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],

  address: [
    {
      required: true,
      message: 'Please input address',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  city: [
    {
      required: true,
      message: 'Please input city',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  state: [
    {
      required: true,
      message: 'Please input state',
      trigger: 'blur',
    },
    { trigger: 'blur' },
  ],

  zip: [
    {
      required: true,
      message: 'Please ZIP',
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
        trigger: ['blur'],
      },
    ],
    phone: [{ type: 'string', required: true, message: 'Please spouse phone' }],
    retirement_date: [
      {
        type: 'date',
        required: true,
        message: 'Please pick a date',
        trigger: 'change',
      },
    ],
    employment_history: [
      {
        company_name: [
          {
            type: 'string',
            required: true,
            message: 'Please spouse company name',
          },
        ],
        occupation: [
          {
            type: 'string',
            required: true,
            message: 'Please spouse occupation',
          },
        ],
        // years: [
        //   {
        //     type: 'string',
        //     required: true,
        //     message: 'Please spouse years',
        //   },
        // ],
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
          message: 'Please company name',
        },
      ],
      occupation: [
        {
          type: 'string',
          required: true,
          message: 'Please occupation',
        },
      ],
      years: [
        {
          validator: validateNumber,
          trigger: 'blur',
          required: true,
        },
      ],
      // years: [
      //   {
      //     type: 'string',
      //     required: true,
      //     message: 'Please years',
      //   },
      // ],
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

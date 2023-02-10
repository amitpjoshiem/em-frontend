/* eslint-disable no-useless-escape */

const rules = {
  housing: {
    mortgage_rent_fees: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    property_taxes_and_insurance: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    utilities: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    household_improvement: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    household_maintenance: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  food_transportation: {
    at_home: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    dining_out: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    vehicle_purchases_payments: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    auto_insurance_and_taxes: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    fuel_and_maintenance: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    public_transportation: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  healthcare: {
    health_insurance: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    medicare_medigap: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    copays_uncovered_medical_services: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    drugs_and_medical_supplies: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  personal_insurance: {
    life_other: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    long_term_care: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    clothing: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
    product_and_services: {
      essential: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customValidateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  entertainment: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  travel: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  hobbies: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  family_care_education: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  income_taxes: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  charitable_contributions: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
  other: {
    essential: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customValidateNumber,
        trigger: 'blur',
      },
    ],
  },
}

function customValidateNumber(rule, value, callback) {
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (Number(value) > 9999999.99) {
    callback(new Error('The value cannot be greater than 9999999.99'))
  }

  if (value < 0) {
    callback(new Error('Unsupported negative value'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

export { rules }

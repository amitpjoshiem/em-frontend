import { customNumberValidation } from './use-custom-number-validation'

const rules = {
  housing: {
    mortgage_rent_fees: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    property_taxes_and_insurance: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    utilities: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    household_improvement: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    household_maintenance: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  food_transportation: {
    at_home: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    dining_out: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    vehicle_purchases_payments: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    auto_insurance_and_taxes: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    fuel_and_maintenance: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    public_transportation: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  healthcare: {
    health_insurance: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    medicare_medigap: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    copays_uncovered_medical_services: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    drugs_and_medical_supplies: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  personal_insurance: {
    life_other: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    long_term_care: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    clothing: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    product_and_services: {
      essential: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      discretionary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  entertainment: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  travel: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  hobbies: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  family_care_education: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  income_taxes: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  charitable_contributions: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
  other: {
    essential: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
    discretionary: [
      {
        validator: customNumberValidation,
        trigger: 'blur',
      },
    ],
  },
}

export { rules }

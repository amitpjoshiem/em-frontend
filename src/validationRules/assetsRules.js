import { customNumberValidation } from './use-custom-number-validation'

const rules = {
  income: {
    income_plan: true,
    member: {
      salary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      social_security: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      rental_income: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      rmds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      interest_dividends: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      salary: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      social_security: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      rental_income: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      rmds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      interest_dividends: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  liquid_assets: {
    member: {
      gift_inheritance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      gift_inheritance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    o_nq: {
      gift_inheritance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    balance: {
      gift_inheritance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
  non_liquid_assets: {
    member: {
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    o_nq: {
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
    balance: {
      total: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: customNumberValidation,
          trigger: 'blur',
        },
      ],
    },
  },
}

export { rules }

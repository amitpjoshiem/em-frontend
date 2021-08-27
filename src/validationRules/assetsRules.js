const rules = {
  income: {
    income_plan: true,
    member: {
      salary: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      social_security: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      rental_income: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      rmds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      interest_dividends: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      salary: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      social_security: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      rental_income: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      rmds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      interest_dividends: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  liquid_assets: {
    member: {
      gift_inheritance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      gift_inheritance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    o_nq: {
      gift_inheritance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    balance: {
      gift_inheritance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_value_life_insurance: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cash_checking_savings_mm: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      stocks_bonds_mf: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other_liquid_assets: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      cds: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      lump_sum_pension: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_not_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
  non_liquid_assets: {
    member: {
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    spouse: {
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    o_nq: {
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
    balance: {
      total: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      other: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      fa_va_subject_to_penalty: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      second_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      first_401k_ira_59: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
      value_of_home: [
        {
          validator: validateNumber,
          trigger: 'blur',
        },
      ],
    },
  },
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  } else if (Number(value) > 9999999.99) {
    callback(new Error('Еhe value cannot be greater than 9999999.99'))
  } else {
    callback()
  }
}

export { rules }

function customValidate(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  callback()
}

function validateNumber(rule, value, callback) {
  if (isNaN(value)) {
    callback(new Error('Data is not a number'))
  }

  if (value < 0) {
    callback(new Error('Unsupported negative value'))
  }

  callback()
}

export function useHookCustomValidate() {
  const setCustomValidate = ({ ruleForm, customRules }) => {
    customRules.value = {
      current_income: {},
      liquid_assets: {},
      other_assets_investments: {},
    }

    if (ruleForm.current_income) {
      Object.keys(ruleForm.current_income).forEach((item) => {
        if (item !== 'total') {
          customRules.value.current_income[item] = {
            owner: {
              trigger: 'blur',
              validator: validateNumber,
            },
            spouse: {
              trigger: 'blur',
              validator: validateNumber,
            },
          }
        }
      })
    }

    if (ruleForm.liquid_assets) {
      Object.keys(ruleForm.liquid_assets).forEach((item) => {
        if (item !== 'total') {
          customRules.value.liquid_assets[item] = {
            owner: {
              trigger: 'blur',
              validator: validateNumber,
            },
            institution: {
              trigger: 'change',
              validator: customValidate,
            },
            spouse: {
              trigger: 'blur',
              validator: validateNumber,
            },
          }
        }
      })
    }

    if (ruleForm.other_assets_investments) {
      Object.keys(ruleForm.other_assets_investments).forEach((item) => {
        if (item !== 'total') {
          customRules.value.other_assets_investments[item] = {
            owner: {
              trigger: 'blur',
              validator: validateNumber,
            },
            institution: {
              trigger: 'change',
              validator: customValidate,
            },
            spouse: {
              trigger: 'blur',
              validator: validateNumber,
            },
          }
        }
      })
    }
  }

  return {
    setCustomValidate,
  }
}

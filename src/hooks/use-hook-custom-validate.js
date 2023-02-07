function customValidate(rule, value, callback) {
  // eslint-disable-next-line no-useless-escape
  if (/[^\w|\/,\(\)\-|\s]/g.test(value)) {
    callback(new Error('Unsupported symbol'))
  }

  if (rule.required && !value) {
    callback(new Error(rule.errorText))
  }

  callback()
}

export function useHookCustomValidate() {
  const setCustomValidate = (ruleForm, customRules) => {
    customRules.value = {
      liquid_assets: {},
      other_assets_investments: {},
    }

    if (ruleForm.liquid_assets) {
      Object.keys(ruleForm.liquid_assets).forEach((item) => {
        customRules.value.liquid_assets[item] = {
          institution: {
            errorText: 'Please input name',
            required: false,
            trigger: 'change',
            validator: customValidate,
          },
        }
      })
    }

    if (ruleForm.other_assets_investments) {
      Object.keys(ruleForm.other_assets_investments).forEach((item) => {
        customRules.value.other_assets_investments[item] = {
          institution: {
            errorText: 'Please input name',
            required: false,
            trigger: 'change',
            validator: customValidate,
          },
        }
      })
    }
  }

  return {
    setCustomValidate,
  }
}

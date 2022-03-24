export function useExpenseInfoHooks() {
  function setInitValue(ruleForm, monthlyExpense) {
    if (monthlyExpense) {
      Object.assign(ruleForm, JSON.parse(JSON.stringify(monthlyExpense)))
    }
  }

  const optionsCurrencyInput = {
    currency: 'USD',
    locale: 'en-US',
    currencyDisplay: 'hidden',
    precision: 2,
  }
  return {
    setInitValue,
    optionsCurrencyInput,
  }
}

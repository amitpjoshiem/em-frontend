class MonthlyIncomeAnalysis {
  constructor(
    {
      current_member,
      current_spouse,
      current_pensions,
      current_rental_income,
      current_investment,
      future_member,
      future_spouse,
      future_pensions,
      future_rental_income,
      future_investment,
      tax,
      ira_first,
      ira_second,
      total,
      monthly_expenses,
    } = {
      current_member: '',
      current_spouse: '',
      current_pensions: '',
      current_rental_income: '',
      current_investment: '',
      future_member: '',
      future_spouse: '',
      future_pensions: '',
      future_rental_income: '',
      future_investment: '',
      tax: '',
      ira_first: '',
      ira_second: '',
      total: 0,
      monthly_expenses: 0,
    }
  ) {
    this.current_member = current_member !== null ? current_member : ''
    this.current_spouse = current_spouse !== null ? current_spouse : ''
    this.current_pensions = current_pensions !== null ? current_pensions : ''
    this.current_rental_income = current_rental_income !== null ? current_rental_income : ''
    this.current_investment = current_investment !== null ? current_investment : ''
    this.future_member = future_member !== null ? future_member : ''
    this.future_spouse = future_spouse !== null ? future_spouse : ''
    this.future_pensions = future_pensions !== null ? future_pensions : ''
    this.future_rental_income = future_rental_income !== null ? future_rental_income : ''
    this.future_investment = future_investment !== null ? future_investment : ''
    this.tax = tax !== null ? tax : ''
    this.ira_first = ira_first !== null ? ira_first : ''
    this.ira_second = ira_second !== null ? ira_second : ''
    this.total = total
    this.monthly_expenses = monthly_expenses
  }
}

export { MonthlyIncomeAnalysis }

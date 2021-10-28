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
    this.current_member = current_member !== '0' ? current_member : ''
    this.current_spouse = current_spouse !== '0' ? current_spouse : ''
    this.current_pensions = current_pensions !== '0' ? current_pensions : ''
    this.current_rental_income = current_rental_income !== '0' ? current_rental_income : ''
    this.current_investment = current_investment !== '0' ? current_investment : ''
    this.future_member = future_member !== '0' ? future_member : ''
    this.future_spouse = future_spouse !== '0' ? future_spouse : ''
    this.future_pensions = future_pensions !== '0' ? future_pensions : ''
    this.future_rental_income = future_rental_income !== '0' ? future_rental_income : ''
    this.future_investment = future_investment !== '0' ? future_investment : ''
    this.tax = tax !== '0' ? tax : ''
    this.ira_first = ira_first !== '0' ? ira_first : ''
    this.ira_second = ira_second !== '0' ? ira_second : ''
    this.total = total
    this.monthly_expenses = monthly_expenses
  }
}

export { MonthlyIncomeAnalysis }

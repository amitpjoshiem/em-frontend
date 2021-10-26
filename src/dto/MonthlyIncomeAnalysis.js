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
      current_member: 0,
      current_spouse: 0,
      current_pensions: 0,
      current_rental_income: 0,
      current_investment: 0,
      future_member: 0,
      future_spouse: 0,
      future_pensions: 0,
      future_rental_income: 0,
      future_investment: 0,
      tax: 0,
      ira_first: 0,
      ira_second: 0,
      total: 0,
      monthly_expenses: 0,
    }
  ) {
    this.current_member = current_member ? current_member : undefined
    this.current_spouse = current_spouse ? current_spouse : undefined
    this.current_pensions = current_pensions ? current_pensions : undefined
    this.current_rental_income = current_rental_income ? current_rental_income : undefined
    this.current_investment = current_investment ? current_investment : undefined
    this.future_member = future_member ? future_member : undefined
    this.future_spouse = future_spouse ? future_spouse : undefined
    this.future_pensions = future_pensions ? future_pensions : undefined
    this.future_rental_income = future_rental_income ? future_rental_income : undefined
    this.future_investment = future_investment ? future_investment : undefined
    this.tax = tax ? tax : undefined
    this.ira_first = ira_first ? ira_first : undefined
    this.ira_second = ira_second ? ira_second : undefined
    this.total = total ? total : 0
    this.monthly_expenses = monthly_expenses ? monthly_expenses : 0
  }
}

export { MonthlyIncomeAnalysis }

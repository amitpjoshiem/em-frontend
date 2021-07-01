export function MonthlyIncome({ title, current, future, monthlyExpenses }) {
  this.title = title
  this.current = current
  this.future = future
  this.monthlyExpenses = monthlyExpenses
}
export function useMonthlyIncome() {
  return {
    isLoading: false,
    data: [
      {
        title: 'John',
        current: '$8,000',
        future: '$10,000',
      },
      {
        title: 'Carmen',
        current: '$8,000',
        future: '$10,000',
      },
      {
        title: 'Pensions',
        current: '$8,000',
        future: '$10,000',
      },
      {
        title: 'Rental income',
        current: '$8,000',
        future: '$10,000',
      },
      {
        title: 'Investments',
        current: '$8,000',
        future: '$10,000',
      },
    ].map((account) => new MonthlyIncome(account)),
    error: false,
  }
}

export function MonthlyExpenses({ title, future }) {
  this.title = title
  this.future = future
}
export function useMonthlyExpenses() {
  return {
    isLoading: false,
    data: [
      {
        title: 'Tax',
        future: '$300',
      },
      {
        title: 'IRA',
        future: '$700',
      },
      {
        title: 'IRA',
        future: '$1300',
      },
    ].map((account) => new MonthlyExpenses(account)),
    error: false,
  }
}

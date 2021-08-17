class MemberDetailsHouse {
  constructor({
    id,
    type,
    market_value,
    total_debt,
    remaining_mortgage_amount,
    monthly_payment,
    total_monthly_expenses,
    updated_at,
    created_at,
    real_id,
  }) {
    this.id = id
    this.type = type
    this.marketValue = market_value
    this.totalDebt = total_debt
    this.remainingMortgageAmount = remaining_mortgage_amount
    this.monthlyPayment = monthly_payment
    this.totalMonthlyExpenses = total_monthly_expenses
    this.updatedAt = updated_at
    this.createdAt = created_at
    this.realId = real_id
  }
}

export { MemberDetailsHouse }

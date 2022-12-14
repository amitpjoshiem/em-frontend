class ClientReportYear {
  constructor({
    beginning_balance,
    interest_credited,
    growth,
    withdrawals,
    current_value,
    surrender_value,
    origination_value,
  }) {
    this.beginning_balance = beginning_balance
    this.interest_credited = interest_credited
    this.growth = growth
    this.withdrawals = withdrawals
    this.current_value = current_value
    this.surrender_value = surrender_value
    this.origination_value = origination_value
  }
}

export { ClientReportYear }

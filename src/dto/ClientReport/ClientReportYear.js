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
    this.beginningBalance = beginning_balance
    this.interestCredited = interest_credited
    this.growth = growth
    this.withdrawals = withdrawals
    this.currentValue = current_value
    this.surrenderValue = surrender_value
    this.originationValue = origination_value
  }
}

export { ClientReportYear }

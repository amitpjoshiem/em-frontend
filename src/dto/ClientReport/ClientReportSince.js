class ClientReportSince {
  constructor({ total_premiums, bonus_received, interest_credited, total_withdrawals, average_growth }) {
    this.total_premiums = total_premiums
    this.bonus_received = bonus_received
    this.interest_credited = interest_credited
    this.total_withdrawals = total_withdrawals
    this.average_growth = average_growth
  }
}

export { ClientReportSince }

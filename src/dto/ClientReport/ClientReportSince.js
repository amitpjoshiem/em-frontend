class ClientReportSince {
  constructor({ total_premiums, bonus_received, interest_credited, total_withdrawals, average_growth }) {
    this.totalPremiums = total_premiums
    this.bonusReceived = bonus_received
    this.interestCredited = interest_credited
    this.totalWithdrawals = total_withdrawals
    this.averageGrowth = average_growth
  }
}

export { ClientReportSince }

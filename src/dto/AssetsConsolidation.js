function AssetsConsolidation({
  id,
  name,
  percent_of_holdings,
  amount,
  management_expense,
  turnover,
  trading_cost,
  wrap_fee,
  total_cost_percent,
  total_cost,
}) {
  this.id = id
  this.name = name
  this.percent_of_holdings = percent_of_holdings
  this.amount = amount
  this.management_expense = management_expense
  this.turnover = turnover
  this.trading_cost = trading_cost
  this.wrap_fee = wrap_fee
  this.total_cost_percent = total_cost_percent
  this.total_cost = total_cost
}

export { AssetsConsolidation }

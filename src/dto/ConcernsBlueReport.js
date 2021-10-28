class ConcernsBlueReport {
  constructor(
    {
      high_fees,
      extremely_high_market_exposure,
      simple,
      keep_the_money_safe,
      massive_overlap,
      design_implement_monitoring_income_strategy,
    } = {
      high_fees: false,
      extremely_high_market_exposure: false,
      simple: false,
      keep_the_money_safe: false,
      massive_overlap: false,
      design_implement_monitoring_income_strategy: false,
    }
  ) {
    this.high_fees = high_fees
    this.extremely_high_market_exposure = extremely_high_market_exposure
    this.simple = simple
    this.keep_the_money_safe = keep_the_money_safe
    this.massive_overlap = massive_overlap
    this.design_implement_monitoring_income_strategy = design_implement_monitoring_income_strategy
  }
}

export { ConcernsBlueReport }

class OpportunityList {
  constructor(
    { close_date, name, amount, stage_name, probability },
    description
  ) {
    this.closeDate = close_date
    this.name = name
    this.amount = amount
    this.stageName = stage_name
    this.probability = probability
    this.description = description
  }
}

export { OpportunityList }

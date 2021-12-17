import dayjs from 'dayjs'
class OpportunityList {
  constructor({ name, amount, stage, close_date, id }) {
    this.name = name
    this.amount = amount
    this.closeDate = close_date
    this.stage = stage
    this.id = id
  }

  get closeDateFormatted() {
    return dayjs(this.closeDate).format('MM/DD/YYYY')
  }
}

export { OpportunityList }

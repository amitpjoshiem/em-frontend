import dayjs from 'dayjs'
class OpportunityList {
  constructor({ name, amount, stage, close_date }) {
    this.name = name
    this.amount = amount
    this.closeDate = close_date
    this.stage = stage
  }

  get closeDateFormatted() {
    return dayjs(this.closeDate).format('DD/MM/YYYY')
  }
}

export { OpportunityList }

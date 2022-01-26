import dayjs from 'dayjs'
class ClientReport {
  constructor({ carrier, contract_number, origination_date, contract_year }) {
    this.carrier = carrier
    this.contractNumber = contract_number
    this.originationDate = origination_date
    this.contractYear = contract_year
  }

  get originationDateFormatted() {
    return dayjs(this.originationDate).format('MM/DD/YYYY')
  }
}

export { ClientReport }

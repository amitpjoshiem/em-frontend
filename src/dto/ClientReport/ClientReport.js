import dayjs from 'dayjs'
class ClientReport {
  constructor({ id, carrier, contract_number, origination_date, contract_year, member_id }) {
    this.id = id
    this.carrier = carrier
    this.contractNumber = contract_number
    this.originationDate = origination_date
    this.contractYear = contract_year
    this.member_id = member_id
  }

  get originationDateFormatted() {
    return dayjs(this.originationDate).format('MM/DD/YYYY')
  }
}

export { ClientReport }

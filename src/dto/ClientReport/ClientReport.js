import dayjs from 'dayjs'
class ClientReport {
  constructor({ id, carrier, contract_number, origination_date, contract_year, member_id, is_custom }) {
    this.id = id
    this.carrier = carrier
    this.contract_number = contract_number
    this.origination_date = origination_date
    this.contract_year = contract_year
    this.member_id = member_id
    this.is_custom = is_custom
  }

  get originationDateFormatted() {
    return dayjs(this.originationDate).format('MM/DD/YYYY')
  }
}

export { ClientReport }

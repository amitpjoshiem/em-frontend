import dayjs from 'dayjs'
class UserFullInfo {
  constructor({ first_name, last_name, type, address, city, created_at }) {
    this.firstName = first_name
    this.lastName = last_name
    this.type = type
    this.address = address
    this.city = city
    this.createdAt = created_at
  }

  get createdAtFormatted() {
    return dayjs(this.createdAt).format('DD/MM/YYYY')
  }
}

export { UserFullInfo }

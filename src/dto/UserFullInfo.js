import dayjs from 'dayjs'
class UserFullInfo {
  constructor({ id, name, type, address, city, created_at }) {
    this.id = id
    this.name = name
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

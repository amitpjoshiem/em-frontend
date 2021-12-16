import dayjs from 'dayjs'
class UserFullInfo {
  constructor({ id, name, type, address, city, created_at, net_worth, step, avatar, onboarding }) {
    this.id = id
    this.name = name
    this.type = type
    this.address = address
    this.city = city
    this.created_at = created_at
    this.netWorth = net_worth
    this.step = step
    this.avatar = avatar
    this.onboarding = onboarding
  }

  get createdAtFormatted() {
    return dayjs(this.created_at).format('MM/DD/YYYY')
  }
}

export { UserFullInfo }

import dayjs from 'dayjs'
class UserFullInfo {
  constructor({
    id,
    name,
    type,
    address,
    city,
    created_at,
    net_worth,
    step,
    avatar,
    onboarding,
    email,
    is_activated,
    can_delete,
    can_restore,
  }) {
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
    this.email = email
    this.is_activated = is_activated
    this.can_delete = can_delete
    this.can_restore = can_restore
  }

  get createdAtFormatted() {
    return dayjs(this.created_at).format('MM/DD/YYYY')
  }
}

export { UserFullInfo }

import dayjs from 'dayjs'
class MemberDetailsUser {
  constructor({
    id,
    type,
    name,
    email,
    birthday,
    age,
    phone,
    married,
    retired,
    retirement_date,
    address,
    city,
    zip,
    created_at,
    updated_at,
    real_id,
    deleted_at,
    step,
    avatar,
    notes,
    total_net_worth,
    goal,
    owner_id,
    state,
  }) {
    this.id = id
    this.type = type
    this.name = name
    this.email = email
    this.birthday = birthday
    this.age = age
    this.phone = phone
    this.married = married
    this.retired = retired
    this.retirementDate = retirement_date
    this.address = address
    this.city = city
    this.zip = zip
    this.createdAt = created_at
    this.updatedAt = updated_at
    this.realId = real_id
    this.deletedAt = deleted_at
    this.step = step
    this.avatar = avatar
    this.notes = notes
    this.total_net_worth = total_net_worth
    this.goal = goal
    this.owner_id = owner_id
    this.state = state
  }

  get retirementDateFormatted() {
    if (this.retirementDate && this.retirementDate !== null) return dayjs(this.retirementDate).format('MM/DD/YYYY')
    return ''
  }

  get birthdayFormatted() {
    if (this.birthday && this.birthday !== null) return dayjs(this.birthday).format('MM/DD/YYYY')
    return ''
  }
}

export { MemberDetailsUser }

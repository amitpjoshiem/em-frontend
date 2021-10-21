import dayjs from 'dayjs'
class MemberDetailsSpouse {
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
  }

  get retirementDateFormatted() {
    return dayjs(this.retirementDate).format('DD/MM/YYYY')
  }

  get birthdayFormatted() {
    return dayjs(this.birthday).format('DD/MM/YYYY')
  }
}

export { MemberDetailsSpouse }

import dayjs from 'dayjs'
class Contacts {
  constructor({ age, birthday, created_at, email, id, is_spouse, name, phone, retired, retirement_date, updated_at }) {
    this.age = age
    this.birthday = birthday
    this.created_at = created_at
    this.email = email
    this.id = id
    this.is_spouse = is_spouse
    this.name = name
    this.phone = phone
    this.retired = retired
    this.retirement_date = retirement_date
    this.updated_at = updated_at
  }

  get birthdayFormatted() {
    if (this.birthday && this.birthday !== null) return dayjs(this.birthday).format('MM/DD/YYYY')
    return ''
  }

  get createdFormatted() {
    if (this.created_at && this.created_at !== null) return dayjs(this.created_at).format('MM/DD/YYYY')
    return ''
  }

  get retirementFormatted() {
    if (this.retirement_date && this.retirement_date !== null) return dayjs(this.retirement_date).format('MM/DD/YYYY')
    return ''
  }

  get updatedFormatted() {
    if (this.updated_at && this.updated_at !== null) return dayjs(this.updated_at).format('MM/DD/YYYY')
    return ''
  }
}

export { Contacts }

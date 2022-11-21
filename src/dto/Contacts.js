import dayjs from 'dayjs'
class Contacts {
  constructor({
    age,
    birthday,
    created_at,
    email,
    id,
    is_spouse,
    first_name,
    last_name,
    phone,
    retired,
    retirement_date,
    updated_at,
  }) {
    this.age = age
    this.birthday = birthday && birthday !== null ? dayjs(birthday).format('MM/DD/YYYY') : ''
    this.created_at = created_at && created_at !== null ? dayjs(created_at).format('MM/DD/YYYY') : ''
    this.email = email
    this.id = id
    this.is_spouse = is_spouse
    this.first_name = first_name
    this.last_name = last_name
    this.phone = phone
    this.retired = retired
    this.retirement_date =
      retirement_date && retirement_date !== null ? dayjs(retirement_date).format('MM/DD/YYYY') : ''
    this.updated_at = updated_at && updated_at !== null ? dayjs(updated_at).format('MM/DD/YYYY') : ''
  }
}

export { Contacts }

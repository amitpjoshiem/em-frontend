import dayjs from 'dayjs'

class ProspectDetailsUser {
  constructor({ id, type, first_name, last_name, birthday }) {
    this.id = id
    this.type = type

    this.firstName = first_name
    this.lastName = last_name
    this.birthday = birthday
  }

  get getAge() {
    return dayjs().from(dayjs('1990-01-01'), true)
  }
}

export { ProspectDetailsUser }

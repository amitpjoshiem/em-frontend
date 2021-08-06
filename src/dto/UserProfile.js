class UserProfile {
  constructor({ id, last_name, first_name, email }) {
    this.id = id
    this.lastName = last_name
    this.firstName = first_name
    this.email = email
  }
  get userFullName() {
    return this.lastName + ' ' + this.firstName
  }
}

export { UserProfile }

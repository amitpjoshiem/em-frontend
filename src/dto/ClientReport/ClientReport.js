class ClientReport {
  constructor({ id, last_name, first_name, email, married }) {
    this.id = id
    this.lastName = last_name
    this.firstName = first_name
    this.email = email
    this.married = married
  }
  get userFullName() {
    return this.lastName + ' ' + this.firstName
  }
}

export { ClientReport }

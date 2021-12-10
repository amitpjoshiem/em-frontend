class UserProfile {
  constructor({ id, last_name, first_name, email, avatar, position }) {
    this.id = id
    this.lastName = last_name
    this.firstName = first_name
    this.email = email
    this.avatar = avatar
    this.position = position
  }
}

export { UserProfile }

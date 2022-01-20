class UserProfile {
  constructor({ id, last_name, first_name, email, avatar, position, phone, phone_verified_at, phone_status, npn }) {
    this.id = id
    this.lastName = last_name
    this.firstName = first_name
    this.email = email
    this.avatar = avatar
    this.position = position
    this.phone = phone
    this.phone_verified_at = phone_verified_at
    this.phone_status = phone_status
    this.npn = npn
  }
}

export { UserProfile }

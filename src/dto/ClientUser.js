class ClientUser {
  constructor({ id, is_client, type, is_email_confirmed }) {
    this.id = id
    this.is_client = is_client
    this.type = type
    this.is_email_confirmed = is_email_confirmed
  }
}

export { ClientUser }

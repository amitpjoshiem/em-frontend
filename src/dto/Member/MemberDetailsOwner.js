class MemberDetailsOwner {
  constructor({ email, first_name, last_name, phone, npm, status }) {
    ;(this.email = email),
      (this.first_name = first_name),
      (this.last_name = last_name),
      (this.phone = phone),
      (this.npm = npm),
      (this.status = status)
  }
}

export { MemberDetailsOwner }

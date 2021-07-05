export function User({ fullName, phone, email, password }) {
  this.fullName = fullName
  this.phone = phone
  this.email = email
  this.password = password
}

export function useUser() {
  return {
    isLoading: false,
    data: {
      avatar: '',
      fullName: 'Adam Kelley',
      phone: '+12223334455',
      email: 'rafaelcarpenter@mail.com',
      password: '...............',
    },
  }
}

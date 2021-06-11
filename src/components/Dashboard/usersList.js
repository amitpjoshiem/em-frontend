export function User({ name, profit, avatar, type, progress, balance }) {
  this.name = name
  this.profit = profit
  this.avatar = avatar
  this.type = type
  this.progress = progress
  this.balance = balance
}

export function useUserList() {
  return {
    isLoading: false,
    data: [
      {
        avatar: '',
        name: 'Jerome & Mary Nelson',
        type: 'prospect',
        profit: '999,999.99',
        progress: 80,
        balance: '963,21',
      },
      {
        avatar: '',
        name: 'Cody & Barbara Moore',
        type: 'prospect',
        profit: '12,380',
        progress: 59,
        balance: '746,44',
      },
      {
        avatar: '',
        name: 'Kelli & Joseph Higgins',
        type: 'prospect',
        profit: '8,654',
        progress: 27,
        balance: '458,44',
      },
      {
        avatar: '',
        name: 'Lydia & Daniel Carpenter',
        type: 'prospect',
        profit: '2,654',
        progress: 28,
        balance: '370,44',
      },
    ].map((user) => new User(user)),
    error: false,
  }
}

export function User({
  avatar,
  name,
  createdOn,
  type,
  onboarding,
  location,
  netWorth,
}) {
  this.avatar = avatar
  this.name = name
  this.createdOn = createdOn
  this.type = type
  this.onboarding = onboarding
  this.location = location
  this.netWorth = netWorth
}

export function useUserList() {
  return {
    isLoading: false,
    data: [
      {
        avatar: '',
        name: 'Jerome & Mary Nelson',
        createdOn: '19.04.21',
        type: 'prospect',
        onboarding: 23,
        location: 'Glendale Heights, IL',
        netWorth: '963,21',
      },
      {
        avatar: '',
        name: 'Cody & Barbara Moore',
        createdOn: '19.04.21',
        type: 'prospect',
        onboarding: 100,
        location: 'Glendale Heights, IL',
        netWorth: '746,44',
      },
      {
        avatar: '',
        name: 'Kelli & Joseph Higgins',
        createdOn: '19.04.21',
        type: 'client',
        onboarding: 36,
        location: 'Glendale Heights, IL',
        netWorth: '458,44',
      },
      {
        avatar: '',
        name: 'Lydia & Daniel Carpenter',
        createdOn: '19.04.21',
        type: 'prospect',
        onboarding: 27,
        location: 'Glendale Heights, IL',
        netWorth: '370,44',
      },
      {
        avatar: '',
        name: 'Lydia & Daniel Carpenter',
        createdOn: '19.04.21',
        type: 'client',
        onboarding: 27,
        location: 'Glendale Heights, IL',
        netWorth: '370,44',
      },
      {
        avatar: '',
        name: 'Lydia & Daniel Carpenter',
        createdOn: '19.04.21',
        type: 'prospect',
        onboarding: 27,
        location: 'Glendale Heights, IL',
        netWorth: '370,44',
      },
    ].map((user) => new User(user)),
    error: false,
  }
}

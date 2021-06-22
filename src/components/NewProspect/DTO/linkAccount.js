export function LinkAccount({ name, accountType, organization, netWorth }) {
  this.name = name
  this.accountType = accountType
  this.accountType = organization
  this.netWorth = netWorth
}

export function useLinkAccount() {
  return {
    isLoading: false,
    data: [
      {
        name: 'Rafael Carpenter',
        accountType: 'Investment',
        organization: 'Vanguard',
        netWorth: '$102,200',
      },
      {
        name: 'Rafael Carpenter',
        accountType: 'Investment',
        organization: 'Vanguard',
        netWorth: '$102,200',
      },
      {
        name: 'Rafael Carpenter',
        accountType: 'Investment',
        organization: 'Vanguard',
        netWorth: '$102,200',
      },
    ].map((account) => new LinkAccount(account)),
    error: false,
  }
}

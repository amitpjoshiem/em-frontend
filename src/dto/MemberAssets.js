class MemberAssets {
  constructor({ growth, income, liquidity, total }) {
    this.growth = growth !== '0' ? growth : ''
    this.income = income !== '0' ? income : ''
    this.liquidity = liquidity !== '0' ? liquidity : ''
    this.total = total
  }
}

export { MemberAssets }

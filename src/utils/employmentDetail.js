function getProperty(property, object) {
  if (!object && typeof object !== 'object') {
    return ''
  }

  return object[property] ?? ''
}

export class EmploymentHistoryMerged {
  constructor(member, spouse) {
    this.companyName = [member, spouse].map((object) =>
      getProperty('companyName', object)
    )
    this.occupation = [member, spouse].map((object) =>
      getProperty('occupation', object)
    )
    this.years = [member, spouse].map((object) => getProperty('years', object))
  }
}

export function employmentDetails(member, spouse) {
  const lenght = Math.max(member.length, spouse.length)
  const employmentArray = []

  for (let i = 0; i < lenght; i++) {
    employmentArray.push(new EmploymentHistoryMerged(member[i], spouse[i]))
  }

  return employmentArray
}

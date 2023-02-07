import dayjs from 'dayjs'
import { rules, employmentHistoryRule } from '@/validationRules/basicRules.js'
import { initialBasicInformation } from '@/hooks/initialState/basicInformation'
import { computed } from 'vue'

export function useBasicInfoHooks() {
  const setInitValue = (ruleForm, member) => {
    if (member && member.id) {
      ruleForm.retired = member.retired
      ruleForm.married = member.married
      ruleForm.name = member.name
      if (member.birthday) ruleForm.birthday = dayjs(member.birthday).format('MM/DD/YYYY')
      if (member.retirement_date) ruleForm.retirement_date = dayjs(member.retirement_date).format('MM/DD/YYYY')
      ruleForm.email = member.email
      ruleForm.address = member.address !== null ? member.address : ''
      ruleForm.city = member.city !== null ? member.city : ''
      ruleForm.state = member.state !== null ? member.state : ''
      ruleForm.zip = member.zip !== null ? member.zip : ''
      ruleForm.phone = member.phone !== null ? member.phone : ''
      ruleForm.is_watch = member.is_watch
      ruleForm.channels = member.channels

      if (member.employment_history.length) {
        Object.assign(ruleForm.employment_history, JSON.parse(JSON.stringify(member.employment_history)))
      }

      if (member.married) {
        Object.assign(ruleForm.spouse, JSON.parse(JSON.stringify(member.spouse)))
        ruleForm.spouse.birthday = dayjs(member.spouse.birthday).format('MM/DD/YYYY')
        ruleForm.spouse.retirement_date =
          member.spouse.retirement_date !== null ? dayjs(member.spouse.retirement_date).format('MM/DD/YYYY') : ''

        if (!ruleForm.spouse.employment_history.length) {
          ruleForm.spouse.employment_history.push({
            company_name: '',
            occupation: '',
            years: '',
          })
        }
      }

      if (member.house.type) Object.assign(ruleForm.house, JSON.parse(JSON.stringify(member.house)))

      if (member.other.id) Object.assign(ruleForm.other, JSON.parse(JSON.stringify(member.other)))

      if (member.type === 'lead') {
        ruleForm.amount_for_retirement = member.amount_for_retirement
        ruleForm.biggest_financial_concern = member.biggest_financial_concern
        ruleForm.wttv4_or_fox59 = member.wttv4_or_fox59
      }
    }
  }

  const addEmployment = (ruleForm) => {
    const length = ruleForm.employment_history.length
    ruleForm.employment_history.push({
      company_name: '',
      occupation: '',
      years: '',
    })
    rules.employment_history[length] = {
      company_name: [employmentHistoryRule.company_name],
      occupation: [employmentHistoryRule.occupation],
      years: [employmentHistoryRule.years],
    }
  }

  const addEmploymentSpouse = (ruleForm) => {
    const length = ruleForm.spouse.employment_history.length
    ruleForm.spouse.employment_history.push({
      company_name: '',
      occupation: '',
      years: '',
    })
    rules.spouse.employment_history[length] = {
      company_name: [employmentHistoryRule.company_name],
      occupation: [employmentHistoryRule.occupation],
      years: [employmentHistoryRule.years],
    }
  }

  const changeCompanyNameMember = ({ ruleForm, index }) => {
    if (ruleForm.employment_history[index].company_name.trim().length) {
      rules.employment_history[index].occupation[0].required = true
      rules.employment_history[index].years[0].required = true
    } else {
      rules.employment_history[index].occupation[0].required = false
      rules.employment_history[index].years[0].required = false
    }
  }

  const changeCompanyNameSpouse = ({ ruleForm, index }) => {
    if (ruleForm.spouse.employment_history[index].company_name.length) {
      rules.spouse.employment_history[index].occupation[0].required = true
      rules.spouse.employment_history[index].years[0].required = true
    } else {
      rules.spouse.employment_history[index].occupation[0].required = false
      rules.spouse.employment_history[index].years[0].required = false
    }
  }

  const changeMarried = (ruleForm) => {
    if (ruleForm.married && !ruleForm.spouse.length) {
      ruleForm.spouse = {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        retired: false,
        retirement_date: '',
        phone: '',
        employment_history: [
          {
            company_name: '',
            occupation: '',
            years: '',
          },
        ],
      }
    }
  }

  const resetState = (ruleForm) => {
    Object.assign(ruleForm, initialBasicInformation)
  }

  const getPlaceholder = computed(() => {
    return dayjs(new Date()).format('MM/DD/YYYY')
  })

  const optionsCurrencyInput = {
    currency: 'USD',
    locale: 'en-US',
    currencyDisplay: 'hidden',
    precision: 2,
  }

  return {
    setInitValue,
    addEmployment,
    addEmploymentSpouse,
    changeCompanyNameMember,
    changeCompanyNameSpouse,
    resetState,
    changeMarried,
    getPlaceholder,
    optionsCurrencyInput,
  }
}

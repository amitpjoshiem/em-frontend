import dayjs from 'dayjs'
import { rules, employmentHistoryRule } from '@/validationRules/basicRules.js'
import { initialBasicInformation } from '@/hooks/initialState/basicInformation'
import { computed } from 'vue'

export function useBasicInfoHooks() {
  const setInitValue = (ruleForm, member) => {
    if (member?.value?.id) {
      ruleForm.retired = member.value.retired
      ruleForm.married = member.value.married
      ruleForm.name = member.value.name
      if (member.value.birthday) ruleForm.birthday = dayjs(member.value.birthday).format('MM/DD/YYYY')
      if (member.value.retirement_date)
        ruleForm.retirement_date = dayjs(member.value.retirement_date).format('MM/DD/YYYY')
      ruleForm.email = member.value.email
      ruleForm.address = member.value.address !== null ? member.value.address : ''
      ruleForm.city = member.value.city !== null ? member.value.city : ''
      ruleForm.state = member.value.state !== null ? member.value.state : ''
      ruleForm.zip = member.value.zip !== null ? member.value.zip : ''
      ruleForm.phone = member.value.phone !== null ? member.value.phone : ''
      ruleForm.is_watch = member.value.is_watch
      ruleForm.channels = member.value.channels

      if (member.value.employment_history.length)
        Object.assign(ruleForm.employment_history, JSON.parse(JSON.stringify(member.value.employment_history)))

      if (member.value.married) {
        Object.assign(ruleForm.spouse, JSON.parse(JSON.stringify(member.value.spouse)))
        ruleForm.spouse.birthday = dayjs(member.value.spouse.birthday).format('MM/DD/YYYY')
        ruleForm.spouse.retirement_date =
          member.value.spouse.retirement_date !== null
            ? dayjs(member.value.spouse.retirement_date).format('MM/DD/YYYY')
            : ''

        if (!ruleForm.spouse.employment_history.length) {
          ruleForm.spouse.employment_history.push({
            company_name: '',
            occupation: '',
            years: '',
          })
        }
      }

      if (member.value.house.type) Object.assign(ruleForm.house, JSON.parse(JSON.stringify(member.value.house)))

      if (member.value.other.id) Object.assign(ruleForm.other, JSON.parse(JSON.stringify(member.value.other)))

      if (member.value.type === 'lead') {
        ruleForm.amount_for_retirement = member.value.amount_for_retirement
        ruleForm.biggest_financial_concern = member.value.biggest_financial_concern
        ruleForm.wttv4_or_fox59 = member.value.wttv4_or_fox59
      }
    }
  }

  const removeEmployment = ({ ruleForm, index }) => {
    ruleForm.employment_history.splice(index, 1)
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

  const removeEmploymentSpouse = ({ ruleForm, index }) => {
    ruleForm.spouse.employment_history.splice(index, 1)
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
        name: '',
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
    removeEmployment,
    addEmployment,
    addEmploymentSpouse,
    changeCompanyNameMember,
    changeCompanyNameSpouse,
    removeEmploymentSpouse,
    resetState,
    changeMarried,
    getPlaceholder,
    optionsCurrencyInput,
  }
}

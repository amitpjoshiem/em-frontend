export function useConfirmationInfoHooks() {
  const setInitValueMember = (ruleForm, member) => {
    ruleForm.wttv4_or_fox59 = member.wttv4_or_fox59 !== null ? member.wttv4_or_fox59 : false
    ruleForm.amount_for_retirement = member.amount_for_retirement !== null ? member.amount_for_retirement : '150000'
    ruleForm.biggest_financial_concern = member.biggest_financial_concern
  }

  const setInitValueConfirmInfo = (ruleForm, data) => {
    ruleForm.consultation = data.consultation !== null ? data.consultation : 'want_consultation_and_book'

    ruleForm.currently_have.cds = data.currently_have.cds ? data.currently_have.cds : false
    ruleForm.currently_have.annuity = data.currently_have.annuity ? data.currently_have.annuity : false
    ruleForm.currently_have.life_insurance = data.currently_have.life_insurance
      ? data.currently_have.life_insurance
      : false
    ruleForm.currently_have.bonds_or_bonds_funds = data.currently_have.bonds_or_bonds_funds
      ? data.currently_have.bonds_or_bonds_funds
      : false
    ruleForm.currently_have.variable_annuity = data.currently_have.variable_annuity
      ? data.currently_have.variable_annuity
      : false
    ruleForm.currently_have.mutual_funds_or_stocks = data.currently_have.mutual_funds_or_stocks
      ? data.currently_have.mutual_funds_or_stocks
      : false
    ruleForm.currently_have.ira_tsa_401_403 = data.currently_have.ira_tsa_401_403
      ? data.currently_have.ira_tsa_401_403
      : false
    ruleForm.currently_have.ong_term_care_insurance = data.currently_have.ong_term_care_insurance
      ? data.currently_have.ong_term_care_insurance
      : false
    ruleForm.currently_have.dormant_accounts = data.currently_have.dormant_accounts
      ? data.currently_have.dormant_accounts
      : false

    ruleForm.more_info_about.indexed_annuities = data.more_info_about.indexed_annuities
      ? data.more_info_about.indexed_annuities
      : false
    ruleForm.more_info_about.moving_my_ira = data.more_info_about.moving_my_ira
      ? data.more_info_about.moving_my_ira
      : false
    ruleForm.more_info_about.securing_my_money = data.more_info_about.securing_my_money
      ? data.more_info_about.securing_my_money
      : false
    ruleForm.more_info_about.strategic_wealth_report = data.more_info_about.strategic_wealth_report
      ? data.more_info_about.strategic_wealth_report
      : false
    ruleForm.more_info_about.rolling_over_my_401_403 = data.more_info_about.rolling_over_my_401_403
      ? data.more_info_about.rolling_over_my_401_403
      : false
    ruleForm.more_info_about.tax_free_accounts = data.more_info_about.tax_free_accounts
      ? data.more_info_about.tax_free_accounts
      : false
    ruleForm.more_info_about.rule_of_100 = data.more_info_about.rule_of_100 ? data.more_info_about.rule_of_100 : false
    ruleForm.more_info_about.retirement_income_analysis = data.more_info_about.retirement_income_analysis
      ? data.more_info_about.retirement_income_analysis
      : false
    ruleForm.more_info_about.my_variable_annuity = data.more_info_about.my_variable_annuity
      ? data.more_info_about.my_variable_annuity
      : false
  }

  return {
    setInitValueMember,
    setInitValueConfirmInfo,
  }
}

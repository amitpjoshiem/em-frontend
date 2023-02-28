import store from '@/store'

export function useSetStatus() {
  const setStatus = ({ status, context }) => {
    if (context === 'medicare_details') store.commit('globalComponents/setUploadMedicareDocsStatus', status)
    if (context === 'property_casualty') store.commit('globalComponents/setUploadPropertyDocsStatus', status)

    if (context === 'investment_and_retirement_accounts')
      store.commit('globalComponents/setUploadInvestmentDocsStatus', status)
    if (context === 'life_insurance_annuity_and_long_terms_care_policies')
      store.commit('globalComponents/setUploadLifeDocsStatus', status)
    if (context === 'social_security_information') store.commit('globalComponents/setUploadSocialDocsStatus', status)
  }

  return {
    setStatus,
  }
}

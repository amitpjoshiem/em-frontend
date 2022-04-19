import { computed } from 'vue'

export function useGetTile(context) {
  const getTitle = computed(() => {
    switch (true) {
      case context === 'investment_and_retirement_accounts':
        return 'Investment And Retirement'
      case context === 'life_insurance_annuity_and_long_terms_care_policies':
        return 'Life Insurance'
      case context === 'social_security_information':
        return 'Social Security Information'
      case context === 'list_of_stock_certificates_or_bonds':
        return 'List of Stock Certificates or Bonds'
      default:
        return 'Client information'
    }
  })

  return {
    getTitle,
  }
}

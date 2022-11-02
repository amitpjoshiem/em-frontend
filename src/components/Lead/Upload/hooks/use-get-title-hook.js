import { computed } from 'vue'

export function useGetTile(context) {
  console.log('context - ', context)
  const getTitle = computed(() => {
    switch (true) {
      // case context === 'investment_and_retirement_accounts':
      //   return 'Upload your Investment/Retirement Statements'
      // case context === 'life_insurance_annuity_and_long_terms_care_policies':
      //   return 'Upload your Life Insurance Statements'
      // case context === 'social_security_information':
      //   return 'Upload your Social Security Statements'
      // case context === 'list_of_stock_certificates_or_bonds':
      //   return 'List of Stock Certificates or Bonds'
      case context === 'medicare_details':
        return 'Upload Medicare Documents'
      case context === 'property_casualty':
        return 'Upload Property & Casualty Documents'
      default:
        return 'Client information'
    }
  })

  return {
    getTitle,
  }
}

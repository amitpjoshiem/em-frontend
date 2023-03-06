import { computed } from 'vue'

export function useGetTile(context) {
  const getTitle = computed(() => {
    switch (true) {
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

import { reactive } from 'vue'

export function usePaginationData(initialPage = 1) {
  const paginationData = reactive({ page: initialPage })
  const handlePaginationChange = (page) => {
    paginationData.page = page
  }

  return { paginationData, handlePaginationChange }
}

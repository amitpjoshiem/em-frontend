import { useQuery } from 'vue-query'
import { EmploymentHistory } from '@/dto/EmploymentHistory'
import { fetchEmploymentHistory } from '@/api/vueQuery/fetch-employment-history'
import { reactive } from 'vue'

export const useEmploymentHistory = (id) => {
  let spouse = reactive({})

  const { isLoading, isError, data } = useQuery(
    ['employmentHistory', id],
    () => {
      return fetchEmploymentHistory(id)
    },
    {
      select: (data) => {
        if (data.data.spouse) {
          spouse.value = data.data.spouse.map((employment) => new EmploymentHistory(employment))
        } else {
          spouse.value = {}
        }
        return data.data.member.map((employment) => new EmploymentHistory(employment))
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
    spouse,
  }
}

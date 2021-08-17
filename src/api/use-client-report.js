import { useQuery } from 'vue-query'
import { ClientReport } from '@/dto/ClientReport/ClientReport'
import { fetchMember } from '@/api/vueQuery/fetch-member'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { reactive } from 'vue'
import { dataFactory } from '@/utils/dataFactory'

export const useClientReport = (id) => {
  let spouse = reactive({})

  const { isLoading, isError, data } = useQuery(
    ['member', id],
    () => {
      return fetchMember(id)
    },
    {
      select: (data) => {
        spouse.value = dataFactory(MemberDetailsSpouse, data.data.spouse.data)

        return new ClientReport(data.data)
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

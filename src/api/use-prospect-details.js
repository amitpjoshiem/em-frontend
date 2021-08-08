import { useQuery } from 'vue-query'
import { ProspectDetailsUser } from '@/dto/Prospect/ProspectDetailsUser'
import { ProspectDetailsHouse } from '@/dto/Prospect/ProspectDetailsHouse'
import { ProspectDetailsSpouse } from '@/dto/Prospect/ProspectDetailsSpouse'
import { ProspectDetailsOther } from '@/dto/Prospect/ProspectDetailsOther'
// import { ProspectDetailsEmploymentHistory } from '@/dto/Prospect/ProspectDetailsEmploymentHistory'
import { fetchProspect } from '@/api/vueQuery/fetch-prospect'
import { reactive } from 'vue'

export const useProspectDetails = (id) => {
  let spouse = reactive({})
  let house = reactive({})
  let other = reactive({})
  let employment = reactive({})

  const { isLoading, isError, data } = useQuery(
    ['members', id],
    () => {
      return fetchProspect(id)
    },
    {
      select: (data) => {
        spouse.value = new ProspectDetailsSpouse(data.data.spouse.data)
        house.value = new ProspectDetailsHouse(data.data.house.data)
        other.value = new ProspectDetailsOther(data.data.other.data)
        employment.value = data.data.employmentHistory.data

        return new ProspectDetailsUser(data.data)
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
    spouse: spouse,
    house,
    employment,
    other,
  }
}

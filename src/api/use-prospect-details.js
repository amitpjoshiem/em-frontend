import { useQuery } from 'vue-query'
import { ProspectDetailsUser } from '@/dto/Prospect/ProspectDetailsUser'
import { ProspectDetailsHouse } from '@/dto/Prospect/ProspectDetailsHouse'
import { ProspectDetailsSpouse } from '@/dto/Prospect/ProspectDetailsSpouse'
import { ProspectDetailsOther } from '@/dto/Prospect/ProspectDetailsOther'
import { ProspectLastEmployment } from '@/dto/Prospect/ProspectLastEmployment'
import { SpouseLastEmployment } from '@/dto/Prospect/SpouseLastEmployment'
import { fetchProspect } from '@/api/vueQuery/fetch-prospect'
import { reactive } from 'vue'

export const useProspectDetails = (id) => {
  let spouse = reactive({})
  let house = reactive({})
  let other = reactive({})
  let employmentProspect = reactive({})
  let employmentSpouse = reactive({})

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
        employmentProspect.value = new ProspectLastEmployment(
          data.data.employmentHistory.data
        )
        employmentSpouse.value = new SpouseLastEmployment(
          data.data.spouse.data.employmentHistory.data
        )

        return new ProspectDetailsUser(data.data)
      },
    }
  )

  return {
    isLoading,
    isError,
    data,
    spouse,
    house,
    employmentProspect,
    employmentSpouse,
    other,
  }
}

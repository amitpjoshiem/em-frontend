import { useQuery } from 'vue-query'
import { ProspectDetailsUser } from '@/dto/Prospect/ProspectDetailsUser'
import { ProspectDetailsHouse } from '@/dto/Prospect/ProspectDetailsHouse'
import { ProspectDetailsSpouse } from '@/dto/Prospect/ProspectDetailsSpouse'
import { ProspectDetailsOther } from '@/dto/Prospect/ProspectDetailsOther'
import { ProspectLastEmployment } from '@/dto/Prospect/ProspectLastEmployment'
import { SpouseLastEmployment } from '@/dto/Prospect/SpouseLastEmployment'
import { fetchProspect } from '@/api/vueQuery/fetch-prospect'
import { dataFactory } from '@/utils/dataFactory'
// import { dataFactoryWithGet } from '@/utils/dataFactoryWithGet'
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
        spouse.value = dataFactory(ProspectDetailsSpouse, data.data.spouse.data)
        house.value = dataFactory(ProspectDetailsHouse, data.data.house.data)
        other.value = dataFactory(ProspectDetailsOther, data.data.other.data)

        employmentProspect.value = dataFactory(
          ProspectLastEmployment,
          data.data.employmentHistory.data
        )

        // employmentSpouse.value = dataFactoryWithGet(
        //   SpouseLastEmployment,
        //   data,
        //   'data.data.spouse.data.employmentHistory.data'
        // )

        // TODO: temporary solutions
        employmentSpouse.value = dataFactory(
          SpouseLastEmployment,
          data.data.spouse?.data?.employmentHistory?.data
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

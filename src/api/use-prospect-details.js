import { useQuery } from 'vue-query'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { MemberDetailsHouse } from '@/dto/Member/MemberDetailsHouse'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { MemberDetailsOther } from '@/dto/Member/MemberDetailsOther'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import { fetchMember } from '@/api/vueQuery/fetch-member'
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
    ['member', id],
    () => {
      return fetchMember(id)
    },
    {
      select: (data) => {
        spouse.value = dataFactory(MemberDetailsSpouse, data.data.spouse)
        house.value = dataFactory(MemberDetailsHouse, data.data.house)
        other.value = dataFactory(MemberDetailsOther, data.data.other)

        employmentProspect.value = dataFactory(MemberLastEmployment, data.data.employment_history[0])

        // employmentSpouse.value = dataFactoryWithGet(
        //   SpouseLastEmployment,
        //   data,
        //   'data.data.spouse.data.employmentHistory.data'
        // )

        // TODO: temporary solutions
        employmentSpouse.value = dataFactory(
          SpouseLastEmployment,
          data.data.spouse.length ? data.data.spouse?.employment_history[0] : []
        )

        return new MemberDetailsUser(data.data)
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

import { useQuery, useQueryClient } from 'vue-query'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { MemberDetailsHouse } from '@/dto/Member/MemberDetailsHouse'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { MemberDetailsOther } from '@/dto/Member/MemberDetailsOther'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import { fetchMember } from '@/api/vueQuery/fetch-member'
import { dataFactory } from '@/utils/dataFactory'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useProspectDetails = () => {
  let spouse = reactive({})
  let house = reactive({})
  let other = reactive({})
  let employmentProspect = reactive({})
  let employmentSpouse = reactive({})
  const route = useRoute()
  const queryClient = useQueryClient()

  const idCallback = () => route.params.id

  const queryKey = reactive(['member'])

  const query = useQuery(
    queryKey,
    () => {
      const id = idCallback()
      return fetchMember(id)
    },
    {
      cacheTime: 0,
      select: (data) => {
        spouse.value = dataFactory(MemberDetailsSpouse, data.data.spouse)
        house.value = dataFactory(MemberDetailsHouse, data.data.house)
        other.value = dataFactory(MemberDetailsOther, data.data.other)
        employmentProspect.value = dataFactory(MemberLastEmployment, data.data.employment_history[0])
        employmentSpouse.value = dataFactory(
          SpouseLastEmployment,
          data.data.spouse && data.data.spouse.employment_history?.length ? data.data.spouse.employment_history[0] : []
        )

        return new MemberDetailsUser(data.data)
      },
    }
  )

  watch(
    route,
    (newV, oldV) => {
      if (Boolean(newV?.params?.id) && oldV?.params?.id !== undefined && newV.name !== 'contract-info') {
        updateMemberInfo()
      }
    },
    { immediate: true, deep: true }
  )

  const updateMemberInfo = () => {
    queryClient.invalidateQueries(['member'])
  }

  return {
    spouse,
    house,
    employmentProspect,
    employmentSpouse,
    other,
    ...query,
    updateMemberInfo,
  }
}

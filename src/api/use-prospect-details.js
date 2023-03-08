import { useQuery, useQueryClient } from 'vue-query'
import { MemberDetailsUser } from '@/dto/Member/MemberDetailsUser'
import { MemberDetailsSpouse } from '@/dto/Member/MemberDetailsSpouse'
import { MemberDetailsOther } from '@/dto/Member/MemberDetailsOther'
import { MemberLastEmployment } from '@/dto/Member/MemberLastEmployment'
import { SpouseLastEmployment } from '@/dto/Member/SpouseLastEmployment'
import { MemberDetailsSalesforce } from '@/dto/Member/MemberDetailsSalesforce'
import { MemberDetailsOwner } from '@/dto/Member/MemberDetailsOwner'
import { fetchProspect } from '@/api/vueQuery/fetch-prospect'
import { dataFactory } from '@/utils/dataFactory'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'

export const useProspectDetails = () => {
  let spouse = reactive({})
  let houses = reactive({})
  let other = reactive({})
  let employmentProspect = reactive({})
  let employmentSpouse = reactive({})
  let salesforce = reactive({})
  let owner = reactive({})
  const route = useRoute()
  const queryClient = useQueryClient()

  const idCallback = () => route.params.id

  const queryKey = reactive(['prospect'])

  const query = useQuery(
    queryKey,
    () => {
      const id = idCallback()
      return fetchProspect(id)
    },
    {
      select: (data) => {
        spouse.value = dataFactory(MemberDetailsSpouse, data.data.spouse)
        houses.value = data.data.houses
        other.value = dataFactory(MemberDetailsOther, data.data.other)
        salesforce.value = dataFactory(MemberDetailsSalesforce, data.data.salesforce.opportunity)
        employmentProspect.value = dataFactory(MemberLastEmployment, data.data.employment_history[0])
        owner.value = dataFactory(MemberDetailsOwner, data.data.owner)
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
    queryClient.invalidateQueries(['prospect'])
  }

  return {
    spouse,
    houses,
    employmentProspect,
    employmentSpouse,
    other,
    salesforce,
    owner,
    ...query,
    updateMemberInfo,
  }
}

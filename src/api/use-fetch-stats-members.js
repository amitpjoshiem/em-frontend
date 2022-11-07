import { fetchStatsMembers } from './vueQuery/fetch-stats-members'
import { useQuery } from 'vue-query'
import { reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'

export const useFetchStatsMembers = (type) => {
  const store = useStore()

  const onlyMy = computed(() => {
    if (store.state.globalComponents.role === 'assistant') {
      return 'selected'
    }
    if (type.value === 'client,prospect') {
      return store.state.globalComponents.onlyMyMember
    }
    if (type.value === 'lead') {
      return store.state.globalComponents.onlyMyLead
    }
    return ''
  })
  const ownerIdMember = computed(() => {
    if (store.state.globalComponents.role === 'assistant') {
      return store.state.globalComponents.advisorId
    }
    if (type.value === 'client,prospect') {
      return store.state.globalComponents.ownerMember?.id
    }
    if (type.value === 'lead') {
      return store.state.globalComponents.ownerLead?.id
    }
    return ''
  })

  const reactiveType = ref(type)
  const reactiveOnlyMyMember = ref(onlyMy)
  const reactiveOwnerIdMember = ref(ownerIdMember)

  const queryKey = reactive([
    ['stats-members'],
    {
      reactiveType,
      reactiveOnlyMyMember,
      reactiveOwnerIdMember,
    },
  ])

  const query = useQuery(queryKey, {
    queryFn: fetchStatsMembers,
    select: ({ data }) => {
      return data
    },
  })

  return {
    ...query,
  }
}

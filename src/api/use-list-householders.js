import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

export const useListHouseholders = (type) => {
  const store = useStore()

  const limit = computed(
    () => store.state.globalComponents.itemsPerPage.values.listOfHouseholds
  )

  const reactiveType = ref(type)
  const reactiveLimit = ref(limit)

  const queryKey = reactive([
    'householders',
    {
      reactiveType,
      reactiveLimit,
    },
  ])

  let pagination = reactive({})

  const query = useQuery(queryKey, {
    cacheTime: 0,
    queryFn: fetchMembersList,
    select: ({ data, meta }) => {
      pagination.value = meta.pagination
      return data.map((houseHolder) => new UserFullInfo(houseHolder))
    },
  })

  watch(pagination, (n, o) => console.log('NNN', { n, o }))
  return {
    ...query,
    pagination,
  }
}

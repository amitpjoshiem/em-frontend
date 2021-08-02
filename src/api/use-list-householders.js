import { useQuery } from 'vue-query'
import { UserFullInfo } from '../dto/UserFullInfo'
import { fetchMembersList } from './vueQuery/fetch-members'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useListHouseholders = ({ type, page }) => {
  const store = useStore()

  const limit = computed(
    () => store.state.globalComponents.itemsPerPage.values.listOfHouseholds
  )

  const reactiveType = ref(type)
  const reactiveLimit = ref(limit)
  const reactivePage = ref(page)

  const queryKey = reactive([
    'householders',
    {
      reactiveType,
      reactiveLimit,
      reactivePage,
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

  return {
    ...query,
    pagination,
  }
}

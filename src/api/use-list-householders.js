import { useQuery } from 'vue-query'
import { UserFullInfo } from '@/dto/UserFullInfo'
import { MembersListPagination } from '@/dto/MembersListPagination'
import { MembersListSalesForce } from '@/dto/MembersListSalesForce'
import { ClientUser } from '@/dto/ClientUser'
import { fetchMembersList } from './vueQuery/fetch-members-list'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

export const useListHouseholders = ({ type, page, status = '', include }) => {
  const store = useStore()

  const limit = computed(() => store.state.globalComponents.itemsPerPage.values.listOfHouseholds)
  const orderBy = computed(() => store.state.globalComponents.sortMembers.orderBy)
  const sortedBy = computed(() => {
    if (store.state.globalComponents.sortMembers.sortedBy === 'ascending') return 'asc'
    if (store.state.globalComponents.sortMembers.sortedBy === 'descending') return 'desc'
    return undefined
  })
  const onlyMy = computed(() => store.state.globalComponents.onlyMyMember)
  const ownerIdMember = computed(() => store.state.globalComponents.ownerIdMember)

  const reactiveType = ref(type)
  const reactiveLimit = ref(limit)
  const reactiveOrderBy = ref(orderBy)
  const reactiveSortedBy = ref(sortedBy)
  const reactivePage = ref(page)
  const reactiveStatus = ref(status)
  const reactiveInclude = ref(include)
  const reactiveOnlyMy = ref(onlyMy)
  const reactiveOwnerIdMember = ref(ownerIdMember)

  const queryKey = reactive([
    'householders-list',
    {
      reactiveType,
      reactiveLimit,
      reactiveOrderBy,
      reactiveSortedBy,
      reactivePage,
      reactiveStatus,
      reactiveInclude,
      reactiveOnlyMy,
      reactiveOwnerIdMember,
    },
  ])

  let pagination = reactive({})
  let salesforce = reactive({})

  const query = useQuery(queryKey, {
    queryFn: fetchMembersList,
    select: ({ data, meta }) => {
      pagination.value = new MembersListPagination(meta.pagination)
      return data.map((user) => {
        const temp = new UserFullInfo(user)
        temp.client_user = new ClientUser(user.client_user)
        if (user.salesforce?.opportunity) temp.salesforce = new MembersListSalesForce(user.salesforce.opportunity)
        return temp
      })
    },
  })

  return {
    ...query,
    pagination,
    salesforce,
  }
}

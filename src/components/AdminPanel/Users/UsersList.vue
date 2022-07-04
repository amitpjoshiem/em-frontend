<template>
  <div class="px-5">
    <UsersSearch />
    <UsersFilterByStatus />
    <UsersFilterByRole />
    <UsersFilterByCompany />
    <UsersListHeader />
    <el-skeleton v-if="isLoading" :rows="7" animated class="p-5 min-h-[370px]" />
    <SwdErrorBlock v-else-if="isError" />
    <template v-else-if="users">
      <UserListItem v-for="item in users" :key="item.id" :user="item" class="border-b" />
      <div v-if="!users.length" class="flex flex-col justify-center items-center min-h-[370px]">
        <div class="w-14 h-14 bg-color-grey rounded-full flex items-center justify-center">
          <InlineSvg :src="IconLastActivityEmpty" />
        </div>
        <span class="text-gray03 font-semibold text-xss mt-5">No recently users</span>
      </div>
    </template>
    <div class="flex items-center justify-center border-color-grey py-6">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import UserListItem from '@/components/AdminPanel/Users/UserListItem'
import UsersFilterByRole from '@/components/AdminPanel/Users/UsersFilterByRole'
import UsersFilterByCompany from '@/components/AdminPanel/Users/UsersFilterByCompany'
import UsersFilterByStatus from '@/components/AdminPanel/Users/UsersFilterByStatus'
import UsersListHeader from '@/components/AdminPanel/Users/UsersListHeader'
import UsersSearch from '@/components/AdminPanel/Users/UsersSearch'
import { useFetchAdminPanelUsers } from '@/api/admin-panel/use-fetch-ap-users.js'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { usePaginationData } from '@/utils/use-pagination-data.js'
import { onUnmounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersList',
  components: {
    UserListItem,
    UsersListHeader,
    UsersFilterByRole,
    UsersFilterByCompany,
    UsersFilterByStatus,
    UsersSearch,
  },
  setup() {
    const store = useStore()

    const { paginationData, handlePaginationChange } = usePaginationData()
    const { isLoading, isError, data: users, pagination } = useFetchAdminPanelUsers(paginationData)

    onUnmounted(() => {
      store.commit('adminPanelUsers/setFilterCompanyAdminPanel', null)
      store.commit('adminPanelUsers/setFilterRoleAdminPanel', null)
    })

    return {
      isLoading,
      isError,
      users,
      pagination,
      IconLastActivityEmpty,
      handlePaginationChange,
    }
  },
}
</script>

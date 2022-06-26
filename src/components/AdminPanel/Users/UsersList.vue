<template>
  <div class="p-5">
    <UsersFilterByRole />
    <UsersFilterByCompany />
    <UsersListHeader />
    <el-skeleton v-if="isLoading" :rows="5" animated class="p-5" />

    <div v-for="item in users" :key="item.id" class="border-b">
      <UserListItem :user="item" />
    </div>

    <div class="flex items-center justify-center border-color-grey py-6">
      <SwdPagination v-if="pagination.value" :options="pagination.value" @selectPage="handlePaginationChange" />
    </div>
  </div>
</template>

<script>
import UserListItem from '@/components/AdminPanel/Users/UserListItem'
import UsersFilterByRole from '@/components/AdminPanel/Users/UsersFilterByRole'
import UsersFilterByCompany from '@/components/AdminPanel/Users/UsersFilterByCompany'
import UsersListHeader from '@/components/AdminPanel/Users/UsersListHeader'
import { useFetchAdminPanelUsers } from '@/api/admin-panel/use-fetch-ap-users.js'
import IconLastActivityEmpty from '@/assets/svg/icon-last-activity-empty.svg'
import { usePaginationData } from '@/utils/use-pagination-data.js'

export default {
  name: 'UsersList',
  components: {
    UserListItem,
    UsersListHeader,
    UsersFilterByRole,
    UsersFilterByCompany,
  },
  setup() {
    const { paginationData, handlePaginationChange } = usePaginationData()
    const { isLoading, isError, data: users, pagination } = useFetchAdminPanelUsers(paginationData)

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

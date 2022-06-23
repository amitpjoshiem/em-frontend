<template>
  <div class="p-5">
    <div class="flex items-center mb-4">
      <div class="pr-4">Filter role:</div>
      <el-button type="primary" size="small" plain>All</el-button>
      <el-button size="small" plain>CEO</el-button>
      <el-button size="small" plain>Admin</el-button>
      <el-button size="small" plain>Assistant</el-button>
      <el-button size="small" plain>Advisor</el-button>
    </div>
    <UsersListHeader />
    <el-skeleton v-if="isLoading" :rows="5" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />

    <div v-for="(item, index) in users.data" v-else-if="users.data" :key="index" class="border-t last:border-b">
      <UserListItem :user="item" />
    </div>
  </div>
</template>

<script>
import UserListItem from '@/components/AdminPanel/Users/UserListItem'
import UsersListHeader from '@/components/AdminPanel/Users/UsersListHeader'
import { useFetchAdminPanelUsers } from '@/api/admin-panel/use-fetch-ap-users.js'

export default {
  name: 'UsersList',
  components: {
    UserListItem,
    UsersListHeader,
  },
  setup() {
    const { isLoading, isError, data: users } = useFetchAdminPanelUsers()

    return {
      isLoading,
      isError,
      users,
    }
  },
}
</script>

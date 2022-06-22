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
    <div v-for="(item, index) in data" :key="index" class="border-t last:border-b">
      <UserListItem :user="item" />
    </div>
  </div>
</template>

<script>
import UserListItem from '@/components/AdminPanel/Users/UserListItem'
import UsersListHeader from '@/components/AdminPanel/Users/UsersListHeader'

export default {
  name: 'UsersList',
  components: {
    UserListItem,
    UsersListHeader,
  },
  setup() {
    const data = [
      {
        name: 'Tom',
        username: 'YDmitriy',
        email: 'admin@swdgroup.net',
        position: 'FE dev',
        phone: '0504522328',
        npm: '123456',
        role: 'CEO',
        company: 'SWD',
        verified: true,
      },
      {
        name: 'Tom1',
        username: 'YDmitriy',
        email: 'admin@swdgroup.net',
        position: 'FE dev',
        phone: '0504522328',
        npm: '123456',
        role: 'Assistant',
        company: 'SWD',
        verified: true,
      },
      {
        name: 'Tom2',
        username: 'YDmitriy',
        email: 'admin@swdgroup.net',
        position: 'FE dev',
        phone: '0504522328',
        npm: '123456',
        role: 'Assistant',
        company: 'SWD',
        verified: false,
      },
      {
        name: 'Tom3',
        username: 'YDmitriy',
        email: 'admin@swdgroup.net',
        position: 'FE dev',
        phone: '0504522328',
        npm: '123456',
        role: 'Advisor',
        company: 'SWD',
        verified: true,
      },
    ]

    return {
      data,
    }
  },
}
</script>

<template>
  <div>
    <AssetsUsersItem
      v-for="(user, index) in usersList"
      :key="index"
      :user="user"
    />
  </div>
</template>
<script>
import AssetsUsersItem from '@/components/Dashboard/AssetsUsersItem.vue'
import { useUserList } from './usersList'

export default {
  name: 'AssetsUsers',
  components: {
    AssetsUsersItem,
  },
  setup() {
    const { data: usersList } = useUserList()
    return { usersList }
  },
}
</script>

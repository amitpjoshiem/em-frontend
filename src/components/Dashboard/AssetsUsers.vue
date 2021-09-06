<template>
  <div class="border-t border-color-grey pb-5">
    <AssetsUsersItem v-for="(user, index) in usersList" :key="index" :user="user" />
  </div>
</template>
<script>
import AssetsUsersItem from '@/components/Dashboard/AssetsUsersItem.vue'
import { useUserList } from '@/components/Dashboard/DTO/usersList'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'

export default {
  name: 'AssetsUsers',
  components: {
    AssetsUsersItem,
  },
  setup() {
    const { data: usersList } = useUserList()

    return {
      usersList,
      IconEmptyUsers,
    }
  },
}
</script>

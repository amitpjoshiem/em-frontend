<template>
  <div v-if="!isEmptyDashboard" class="border-t border-color-grey pb-5">
    <AssetsUsersItem
      v-for="(user, index) in usersList"
      :key="index"
      :user="user"
    />
  </div>
  <div
    v-if="isEmptyDashboard"
    class="
      border-t border-color-grey
      flex
      justify-center
      items-center
      flex-col
      h-44
    "
  >
    <div
      class="
        w-14
        h-14
        rounded-full
        bg-widget-bg
        items-center
        justify-center
        flex
      "
    >
      <InlineSvg :src="IconEmptyUsers" class="w-5" />
    </div>
    <span class="text-gray03 text-xss pt-3">No recently added prospects</span>
  </div>
</template>
<script>
import AssetsUsersItem from '@/components/Dashboard/AssetsUsersItem.vue'
import { useUserList } from '@/components/Dashboard/DTO/usersList'
import IconEmptyUsers from '@/assets/svg/icon-empty-users.svg'
import { useEmptyDashboard } from '@/utils/useEmptyDashboard'

export default {
  name: 'AssetsUsers',
  components: {
    AssetsUsersItem,
  },
  setup() {
    const { data: usersList } = useUserList()
    const isEmptyDashboard = useEmptyDashboard()

    return {
      usersList,
      IconEmptyUsers,
      isEmptyDashboard,
    }
  },
}
</script>

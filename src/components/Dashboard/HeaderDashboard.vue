<template>
  <div class="h-20 flex items-center">
    <div v-if="!isLoading" class="flex pt-5 pb-5 text-2xl font-medium">
      <span> Welcome, {{ userProfile.lastName }} {{ userProfile.firstName }} </span>
      <span v-if="userProfile.position" class="pl-2">({{ userProfile.position }})</span>
    </div>
    <el-skeleton v-else :rows="0" animated />
  </div>
</template>
<script>
import { useUserProfile } from '@/api/use-user-profile.js'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useShowContentEnv } from '@/hooks/use-show-content-env'

export default {
  name: 'HeaderDashboard',
  setup() {
    const store = useStore()

    const { showContent } = useShowContentEnv()

    const isRole = computed(() => {
      return store.state.globalComponents.role
    })

    const { isLoading, isError, data: userProfile } = useUserProfile()

    return {
      isLoading,
      isError,
      userProfile,
      isRole,
      showContent,
    }
  },
}
</script>

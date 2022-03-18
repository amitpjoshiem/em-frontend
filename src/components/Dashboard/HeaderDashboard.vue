<template>
  <div class="h-20 flex items-center">
    <div v-if="!isLoading" class="flex pt-5 pb-5 text-2xl font-medium">
      <span class=""> Welcome, {{ userProfile.firstName }} {{ userProfile.lastName }} </span>
      <span v-if="userProfile.position" class="pl-2">({{ userProfile.position }})</span>
    </div>
    <el-skeleton v-else :rows="0" animated />
  </div>
</template>
<script>
import { useUserProfile } from '@/api/use-user-profile.js'

export default {
  name: 'HeaderDashboard',
  setup() {
    const { isLoading, isError, data: userProfile } = useUserProfile()

    return {
      isLoading,
      isError,
      userProfile,
    }
  },
}
</script>

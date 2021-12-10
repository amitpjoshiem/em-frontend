<template>
  <div class="h-20 flex items-center">
    <div v-if="!isLoading" class="flex pt-5 pb-5 justify-between w-full">
      <span class="text-2xl font-medium">
        Welcome, {{ userProfile.firstName }} {{ userProfile.lastName }} ({{ userProfile.position }})</span
      >
    </div>
    <el-skeleton v-else :rows="0" animated />
  </div>
</template>
<script>
import { useUserProfile } from '@/api/use-user-profile.js'

export default {
  name: 'PipeLine',
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

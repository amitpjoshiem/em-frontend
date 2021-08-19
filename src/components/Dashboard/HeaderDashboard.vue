<template>
  <div class="flex pt-5 pb-5 justify-between">
    <div class="text-2xl font-medium">
      <span v-if="!isLoadingUserProfile">
        Welcome, {{ userProfile.firstName }} {{ userProfile.lastName }}
      </span>
    </div>
    <ShareBtn />
  </div>
</template>
<script>
import { useUserProfile } from '@/api/use-user-profile.js'

export default {
  name: 'PipeLine',
  setup() {
    const {
      isLoading: isLoadingUserProfile,
      isError: isErrorUserProfile,
      data: userProfile,
    } = useUserProfile()

    return {
      isLoadingUserProfile,
      isErrorUserProfile,
      userProfile,
    }
  },
}
</script>

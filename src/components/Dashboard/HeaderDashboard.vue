<template>
  <div class="h-20 flex items-center">
    <div v-if="!isLoading" class="flex pt-5 pb-5 text-2xl font-medium">
      <span class="pr-2">({{ isRole }})</span>
      <span class=""> Welcome, {{ userProfile.firstName }} {{ userProfile.lastName }} </span>
      <span v-if="userProfile.position" class="pl-2">({{ userProfile.position }})</span>
      <!-- <span v-if="$can('create', 'Post')">test</span> -->
    </div>
    <el-skeleton v-else :rows="0" animated />
  </div>
</template>
<script>
import { useUserProfile } from '@/api/use-user-profile.js'
import { useStore } from 'vuex'
import { computed } from 'vue'

// import { useAbility } from '@casl/vue'

export default {
  name: 'PipeLine',
  setup() {
    const store = useStore()
    // const { can } = useAbility()

    const isRole = computed(() => {
      return store.state.auth.role
    })

    const { isLoading, isError, data: userProfile } = useUserProfile()

    return {
      isLoading,
      isError,
      userProfile,
      isRole,
      // can,
    }
  },
}
</script>

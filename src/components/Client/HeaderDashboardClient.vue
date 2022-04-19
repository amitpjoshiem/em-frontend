<template>
  <div class="sm:h-20 flex items-center">
    <div v-if="!isLoading" class="flex pt-5 pb-5 text-2xl font-medium">
      <span class="pr-2">({{ isRole }})</span>
      <span class=""> Welcome, {{ clientsInfo.name }}</span>
    </div>
    <el-skeleton v-else :rows="0" animated />
  </div>
</template>

<script>
import { useFetchClietsInfo } from '@/api/clients/use-fetch-clients-info'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'HeaderDashboardClient',
  setup() {
    const store = useStore()

    const isRole = computed(() => {
      return store.state.auth.role
    })

    const { isLoading, fetching, isError, data: clientsInfo } = useFetchClietsInfo()

    return {
      isLoading,
      fetching,
      isError,
      clientsInfo,
      isRole,
    }
  },
}
</script>

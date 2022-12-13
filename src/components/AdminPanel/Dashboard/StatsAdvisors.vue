<template>
  <WidgetAmountUser title="Advisors" :loading="isLoading" :amount="isLoading ? 0 : data.data.users.advisor" />
</template>

<script>
import { useFetchStatsAdvisors } from '@/api/use-fetch-stats-advisors.js'
import WidgetAmountUser from './WidgetAmountUser.vue'

export default {
  name: 'StatsAdvisors',
  components: {
    WidgetAmountUser,
  },
  setup() {
    const { isLoading, isError, data } = useFetchStatsAdvisors()

    return {
      isLoading,
      isError,
      data,
    }
  },
}
</script>

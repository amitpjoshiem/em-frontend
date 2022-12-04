<template>
  <div class="flex justify-between">
    <WidgetAmountUser class="mr-2" title="Client" :loading="isLoading" :amount="isLoading ? 0 : data.count.client" />
    <WidgetAmountUser
      class="mr-2"
      title="Opportunity"
      :loading="isLoading"
      :amount="isLoading ? 0 : data.count.prospect"
    />
    <WidgetAmountUser class="mr-2" title="Prospect" :loading="isLoading" :amount="isLoading ? 0 : data.count.lead" />
    <WidgetAmountUser
      title="Prospect 1st appointment stage"
      :loading="isLoading"
      :amount="isLoading ? 0 : data.count.pre_lead"
    />
  </div>
</template>

<script>
import { useFetchStatsMembers } from '@/api/use-fetch-stats-members.js'
import WidgetAmountUser from './WidgetAmountUser.vue'

export default {
  name: 'StatsAdvisors',
  components: {
    WidgetAmountUser,
  },
  setup() {
    const { isLoading, isError, data } = useFetchStatsMembers('client,prospect')

    return {
      isLoading,
      isError,
      data,
    }
  },
}
</script>

<template>
  <SwdWrapper>
    <SwdSubHeader title="Help" :with-back-btn="false" />
    <el-card class="mb-4">
      <div class="text-center font-semibold text-main">Lead portal</div>
      <div class="flex flex-wrap mt-4">
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_basic' } }">
          <SwdButton primary small class="mr-4">Basic Information</SwdButton>
        </router-link>
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_assets_income' } }">
          <SwdButton primary small class="mr-4">Assets & Income</SwdButton>
        </router-link>
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_monthly_expenses' } }">
          <SwdButton primary small class="mr-4">Expenses</SwdButton>
        </router-link>
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_step_2' } }">
          <SwdButton primary small class="mr-4">Step 2</SwdButton>
        </router-link>
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_confirm' } }">
          <SwdButton primary small class="mr-4">Confirmation page</SwdButton>
        </router-link>
        <router-link :to="{ name: `${route.meta.type}/ap-help-item`, params: { id: 'prospect_email_help' } }">
          <SwdButton primary small class="">Email Help</SwdButton>
        </router-link>
      </div>
    </el-card>
  </SwdWrapper>
</template>

<script>
import { useFetchApClientsHelp } from '@/api/admin-panel/use-fetch-ap-clients-help.js'
import { useRoute } from 'vue-router'

export default {
  name: 'Help',
  setup() {
    const route = useRoute()

    const { isLoading, isError, data: dataHelp } = useFetchApClientsHelp()

    return {
      route,
      dataHelp,
      isError,
      isLoading,
    }
  },
}
</script>

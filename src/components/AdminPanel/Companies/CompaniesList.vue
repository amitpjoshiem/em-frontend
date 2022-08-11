<template>
  <div class="p-5">
    <CompaniesListHeader />
    <el-skeleton v-if="isLoading" :rows="5" animated class="p-5" />
    <SwdErrorBlock v-else-if="isError" />
    <div v-for="(item, index) in companies.data" v-else-if="companies.data" :key="index" class="border-t last:border-b">
      <CompaniesListItem :company="item" />
    </div>
  </div>
</template>

<script>
import CompaniesListHeader from '@/components/AdminPanel/Companies/CompaniesListHeader'
import CompaniesListItem from '@/components/AdminPanel/Companies/CompaniesListItem'
import { useFetchAdminPanelCompanies } from '@/api/admin-panel/use-fetch-ap-companies.js'

export default {
  name: 'CompaniesList',
  components: {
    CompaniesListHeader,
    CompaniesListItem,
  },
  setup() {
    const { isLoading, isError, data: companies } = useFetchAdminPanelCompanies()

    return {
      isLoading,
      isError,
      companies,
    }
  },
}
</script>

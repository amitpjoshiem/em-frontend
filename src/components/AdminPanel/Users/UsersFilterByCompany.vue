<template>
  <div class="flex items-center mb-4">
    <div class="pr-4 text-main">Company:</div>
    <SwdSpinner v-if="isLoading" />
    <template v-else>
      <el-button :type="currentFilter === null ? 'primary' : ''" size="small" plain @click="getFilter(null)">
        All
      </el-button>
      <el-button
        v-for="(item, index) in init.companies"
        :key="index"
        size="small"
        plain
        :type="currentFilter === item.name ? 'primary' : ''"
        @click="getFilter(item)"
      >
        {{ item.name }}
      </el-button>
    </template>
  </div>
</template>

<script>
import { useFetchAdminPanelRolesCompanies } from '@/api/admin-panel/use-fetch-admin-panel-roles-companies.js'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersFilterByCompany',
  setup() {
    const store = useStore()
    const currentFilter = ref(null)

    const { isLoading, isError, data: init } = useFetchAdminPanelRolesCompanies()

    const getFilter = (company) => {
      if (company?.id) {
        currentFilter.value = company.name
        store.commit('adminPanelUsers/setFilterCompanyAdminPanel', company.id)
      } else {
        currentFilter.value = null
        store.commit('adminPanelUsers/setFilterCompanyAdminPanel', null)
      }
    }

    return {
      isLoading,
      isError,
      init,
      getFilter,
      currentFilter,
    }
  },
}
</script>

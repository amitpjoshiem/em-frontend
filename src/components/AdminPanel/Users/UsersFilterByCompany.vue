<template>
  <div class="flex flex-wrap items-center">
    <div class="pr-4 mb-2 text-main">Company:</div>
    <SwdSpinner v-if="isLoading" class="mb-2" />
    <template v-else>
      <el-button
        :type="currentFilter === null ? 'primary' : ''"
        size="small"
        plain
        class="mb-2 mr-2"
        @click="getFilter(null)"
      >
        All
      </el-button>
      <span v-for="(item, index) in init.companies" :key="index" class="mr-2">
        <el-button
          size="small"
          class="mb-2"
          plain
          :type="currentFilter === item.name ? 'primary' : ''"
          @click="getFilter(item)"
        >
          {{ item.name }}
        </el-button>
      </span>
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

    const { isLoading, data: init } = useFetchAdminPanelRolesCompanies()

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
      init,
      getFilter,
      currentFilter,
    }
  },
}
</script>

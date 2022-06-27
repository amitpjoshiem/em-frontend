<template>
  <div class="flex items-center mb-4">
    <div class="pr-4 text-main">Role:</div>
    <SwdSpinner v-if="isLoading" />
    <template v-else>
      <el-button :type="currentFilter === null ? 'primary' : ''" size="small" plain @click="getFilter(null)">
        All
      </el-button>
      <el-button
        v-for="(role, index) in init.roles"
        :key="index"
        size="small"
        plain
        :type="currentFilter === role.display_name ? 'primary' : ''"
        @click="getFilter(role)"
      >
        {{ role.display_name }}
      </el-button>
    </template>
  </div>
</template>

<script>
import { useFetchAdminPanelRolesCompanies } from '@/api/admin-panel/use-fetch-admin-panel-roles-companies.js'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersFilterByRole',
  setup() {
    const store = useStore()
    const currentFilter = ref(null)

    const { isLoading, isError, data: init } = useFetchAdminPanelRolesCompanies()

    const getFilter = (role) => {
      if (role?.id) {
        currentFilter.value = role.display_name
        store.commit('adminPanelUsers/setFilterRoleAdminPanel', role.id)
      } else {
        currentFilter.value = null
        store.commit('adminPanelUsers/setFilterRoleAdminPanel', null)
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

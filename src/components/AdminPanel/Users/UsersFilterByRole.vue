<template>
  <div class="flex flex-wrap items-center">
    <div class="pr-4 mb-2 text-main">Role:</div>
    <SwdSpinner v-if="isLoading" />
    <template v-else>
      <el-button
        class="mb-2 mr-2"
        :type="currentFilter === null ? 'primary' : ''"
        size="small"
        plain
        @click="getFilter(null)"
      >
        All
      </el-button>
      <span v-for="(role, index) in init.roles" :key="index" class="mr-2">
        <el-button
          size="small"
          plain
          class="mb-2"
          :type="currentFilter === role.display_name ? 'primary' : ''"
          @click="getFilter(role)"
        >
          {{ role.display_name }}
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
  name: 'UsersFilterByRole',
  setup() {
    const store = useStore()
    const currentFilter = ref(null)

    const { isLoading, data: init } = useFetchAdminPanelRolesCompanies()

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
      init,
      getFilter,
      currentFilter,
    }
  },
}
</script>

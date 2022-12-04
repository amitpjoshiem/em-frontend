<template>
  <div class="p-5">
    <SwdSubHeader title="Dashboard" :with-back-btn="false" />
    <el-select v-model="selectCompany" class="m-2" placeholder="Select" @change="handleChange">
      <el-option v-for="item in optionsCompany" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div class="p-5 border rounded mb-4">
      <div class="pb-2 text-main font-semibold">Company employees:</div>
      <StatsAdvisors />
    </div>
    <div class="p-5 border rounded">
      <div class="pb-2 text-main font-semibold">Company clients:</div>
      <StatsMembers />
    </div>
  </div>
</template>

<script>
import StatsAdvisors from './StatsAdvisors.vue'
import StatsMembers from './StatsMembers.vue'
import { ref, watch } from 'vue'
import { useFetchAdminPanelRolesCompanies } from '@/api/admin-panel/use-fetch-admin-panel-roles-companies'
import { useStore } from 'vuex'
import { useQueryClient } from 'vue-query'

export default {
  name: 'AdminPanelDashboard',
  components: {
    StatsAdvisors,
    StatsMembers,
  },
  setup() {
    const store = useStore()

    const queryClient = useQueryClient()
    const optionsCompany = ref([])
    const selectCompany = ref('')

    const { isLoading, data: init } = useFetchAdminPanelRolesCompanies()

    watch(isLoading, (newValue, oldValue) => {
      if (newValue !== oldValue && newValue === false) {
        optionsCompany.value = init.value.companies.map((item) => {
          return { label: item.name, value: item.id }
        })
        selectCompany.value = optionsCompany.value[0]
      }
    })

    const handleChange = (value) => {
      store.commit('globalComponents/setCurrentCompanyId', value)
      queryClient.invalidateQueries(['stats-advisors'])
      queryClient.invalidateQueries(['stats-members'])
    }

    return {
      isLoading,
      init,
      optionsCompany,
      selectCompany,
      handleChange,
    }
  },
}
</script>

<template>
  <div class="p-5">
    <SwdSubHeader title="Companies" :with-back-btn="false">
      <template #add-company>
        <el-button type="primary" :icon="Edit" plain size="small" @click="openDialog">Add company</el-button>
      </template>
    </SwdSubHeader>
  </div>
  <CompaniesList />
</template>

<script>
import { Edit } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import CompaniesList from '@/components/AdminPanel/Companies/CompaniesList'

export default {
  name: 'Companies',
  components: {
    CompaniesList,
  },
  setup() {
    const store = useStore()

    const openDialog = () => {
      store.commit('adminPanelUsers/setShowModal', {
        destination: 'modalCompany',
        value: true,
      })
    }

    return {
      Edit,
      openDialog,
      confirm,
    }
  },
}
</script>

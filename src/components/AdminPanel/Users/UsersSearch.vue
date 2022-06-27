<template>
  <div class="flex items-center mb-2">
    <span class="text-main text-sm font-semibold">Name: </span>
    <el-input
      v-model="name"
      size="small"
      placeholder="Please Input"
      :prefix-icon="Search"
      class="w-48 ml-2"
      clearable
    />
    <!-- <el-button type="danger" :icon="Delete" size="small" @click="removeAllFilter">Remove all filter</el-button> -->
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersSearch',
  setup() {
    const store = useStore()
    const name = ref('')

    watchEffect(() => {
      if (name.value.length > 2) {
        setTimeout(function () {
          store.commit('adminPanelUsers/setFilterUserAdminPanel', name.value)
        }, 1000)
      } else {
        store.commit('adminPanelUsers/setFilterUserAdminPanel', null)
      }
    })

    // const removeAllFilter = () => {
    //   name.value = ''
    //   store.commit('adminPanelUsers/setFilterUserAdminPanel', null)
    //   store.commit('adminPanelUsers/setFilterCompanyAdminPanel', null)
    //   store.commit('adminPanelUsers/setFilterRoleAdminPanel', null)
    // }

    return {
      Search,
      // Delete,
      name,
      // removeAllFilter,
    }
  },
}
</script>

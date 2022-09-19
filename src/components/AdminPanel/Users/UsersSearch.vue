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

    return {
      Search,
      name,
    }
  },
}
</script>

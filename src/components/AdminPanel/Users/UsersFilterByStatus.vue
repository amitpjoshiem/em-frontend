<template>
  <div class="flex flex-wrap items-center px-5 pt-4 border border-input-border rounded-lg mb-2">
    <div class="pr-4 mb-4 text-main text-sm font-semibold">Status:</div>
    <el-button
      class="mb-4 mr-2"
      :type="currentFilter === 'witch' ? 'primary' : ''"
      size="small"
      plain
      @click="getFilter('witch')"
    >
      All
    </el-button>
    <el-button
      class="mb-4 mr-2"
      :type="currentFilter === null ? 'primary' : ''"
      size="small"
      plain
      @click="getFilter(null)"
    >
      Active
    </el-button>
    <el-button
      class="mb-4 mr-2"
      :type="currentFilter === 'only' ? 'primary' : ''"
      size="small"
      plain
      @click="getFilter('only')"
    >
      Deleted
    </el-button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'UsersFilterByRole',
  setup() {
    const store = useStore()
    const currentFilter = ref('witch')

    const getFilter = (status) => {
      currentFilter.value = status
      store.commit('adminPanelUsers/setFilterStatusAdminPanel', status)
    }

    return {
      getFilter,
      currentFilter,
    }
  },
}
</script>

<template>
  <div>
    <template v-if="!isLoading">
      <UsersListTable :items-header="itemsHeader" :users-list="data" />
      <div
        class="flex items-center justify-center border-t border-color-grey py-6"
      >
        <Pagination :options="pagination.value" @selectPage="handleSelect" />
      </div>
    </template>
    <el-skeleton v-else :rows="rows" animated class="p-5" />
  </div>
</template>

<script>
import { itemsHeader } from '@/components/ListOfHouseholds/itemsHeaderTable'
import { useListHouseholders } from '@/api/use-list-householders.js'
import UsersListTable from '@/components/UsersListTable/UsersListTable.vue'
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'ListAll',
  components: {
    UsersListTable,
  },
  setup() {
    const store = useStore()

    const dataListAll = reactive({
      page: 1,
    })

    const rows = computed(
      () => store.state.globalComponents.itemsPerPage.values.dashboard
    )

    const { isLoading, isError, data, pagination } = useListHouseholders({
      type: 'all',
      page: dataListAll,
    })

    const handleSelect = (page) => {
      dataListAll.page = page
    }

    return {
      itemsHeader,
      isLoading,
      isError,
      data: data,
      pagination: pagination,
      handleSelect,
      rows,
    }
  },
}
</script>
